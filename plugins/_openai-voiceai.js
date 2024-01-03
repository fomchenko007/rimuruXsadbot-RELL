const fetch = require('node-fetch');
const gtts = require('node-gtts');
const {
    readFileSync,
    unlinkSync
} = require('fs');
const {
    join
} = require('path');
const axios = require('axios');
const translate = require('@vitalets/google-translate-api');
const OpenAI = require('openai');

const defaultLang = 'id';
const language = 'id';
const sysmsg = `Akan bertindak seperti bot WhatsApp.`;

const openai = new OpenAI({
    apiKey: global.openaikey
});

const handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `*Masukkan pertanyaan untuk menggunakan perintah ini*\n\n*Contoh:*\n*- ${usedPrefix + command} Refleksi tentang Netflix La Casa de Papel 2022*\n*- ${usedPrefix + command} Kode JS untuk permainan kartu*`;
    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const inputValue = text;
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const textToSpeechApiUrl = 'https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    role: 'user',
                    content: inputValue,
                }, ],
            }),
        });
        const chatData = await chatResponse.json();
        const textToSpeechResponse = await fetch(textToSpeechApiUrl, {
            method: 'POST',
            headers: {
                'accept': 'audio/mpeg',
                'xi-api-key': '08a134b000ccc8017863efc0160ff934',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": chatData.choices[0].message.content,
                "model_id": "eleven_multilingual_v2",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.5,
                },
            }),
        });

        const audioBuffer = await textToSpeechResponse.arrayBuffer();
        const audioUrl = Buffer.from(audioBuffer);
        await conn.sendMessage(m.chat, {
            audio: audioUrl,
            fileName: 'response.mp3',
            mimetype: 'audio/mpeg',
            ptt: true
        }, {
            quoted: m
        });
    } catch (e) {
        try {
            conn.sendPresenceUpdate('composing', m.chat);
            const response = await getOpenAIChatCompletion(text, global.openaikey);

            if (response == 'error' || response == '' || !response) {
                throw eror;
            }

            const audio = await tts(response, language);
            await conn.sendMessage(m.chat, {
                audio: audio,
                fileName: 'response.mp3',
                mimetype: 'audio/mpeg',
                ptt: true
            }, {
                quoted: m
            });
        } catch (e) {
            // Handle other fallbacks if needed
        }
    }
};
handler.help = ["voicegpt"]
handler.tags = ["ai"];
handler.command = /^(openaivoce|voicegpt|voiceai)$/i;
module.exports = handler;

function tts(text, lang = 'id') {
    console.log(lang, text);
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang);
            let filePath = join(__dirname, '../tmp', (1 * new Date()) + '.wav');
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath));
                unlinkSync(filePath);
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function getOpenAIChatCompletion(texto, openaiAPIKey) {
    const chgptdb = [{
        role: 'user',
        content: texto
    }];
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiAPIKey}`
    };
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "system",
            "content": sysmsg
        }, ...chgptdb, ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const result = await response.json();
    const finalResponse = result.choices[0].message.content;
    return finalResponse;
}