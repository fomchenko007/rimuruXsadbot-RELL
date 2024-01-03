const fetch = require("node-fetch");

const handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "input text\nEx. .ttsp hello world\n<command> <tex>";
    let text;

    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw query;

    let urut = text.split("|");
    let one = urut[0];
    let two = urut[1];
    let three = urut[2];

    let lis = [
        "Lotte",
        "Maxim",
        // ... (remaining array elements)
        "Seoyeon",
        "Emma",
        "Stephen"
    ];

    if (command == "ttsp") {
        let listSections = [];
        Object.keys(lis).map((v, index) => {
            listSections.push(["Model [ " + ++index + " ]", [
                [lis[v], usedPrefix + command + "get " + lis[v] + "|" + text, "➥"]
            ]]);
        });

        return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m);
    }

    if (command == "ttspget") {
        try {
            let res = `https://api.pawan.krd/tts?text=${encodeURIComponent(two)}&voice=${one}`;
            await conn.sendFile(m.chat, res, '', '', m, null, {
                ptt: true,
                waveform: [100, 0, 100, 0, 100, 0, 100],
                contextInfo: adReplyS.contextInfo
            });
        } catch (e) {
            await m.reply(eror);
        }
    }

    if (command == "ttsplist") {
        let res = lis.map((v, index) => ++index + ". " + v).join("\n");
        let nah = `${htki} *L I S T* ${htka}\n*Example* ${usedPrefix + command} Brian|halo\n${res}`;
        await m.reply(nah);
    }
};

handler.help = ["ttsp"];
handler.tags = ["ai"];
handler.premium = true;
handler.command = /^(ttsp|ttspget|ttsplist)$/i;

module.exports = handler;