const axios = require('axios');
const cheerio = require('cheerio');

var handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `;
  await m.reply('wait');
  const senderId = m.sender;
  const messageContent = text;
  await sendWebhookMessage(senderId, messageContent, m.reply);
};

async function sendWebhookMessage(senderId, messageContent, reply) {
  const artikelurl = `https://id.search.yahoo.com/search?ei=UTF-8&pvid=ySFm2TEwLjLN7xTYYg3TNgJjMTAzLgAAAABRmqFR&gprid=&fr=sfp&fr2=sa-gp&p=${encodeURIComponent(messageContent)}`;

  const webhookUrl = 'https://webhook.botika.online/webhook/';

  try {
    const response = await axios.get(artikelurl);
    const $ = cheerio.load(response.data);

    const articles = $('.compText').slice(0, 3).map((_, element) => $(element).text().trim()).get();
    const googleArticles = articles.join('\n');

    const riki = "chatbot v" + Date.now() + new Date().toISOString() + Math.random().toString().substr(2);

    // Prepare the payload data
    const payload = {
      app: {
        id: "b3ekyuzy5sr1684434419722",
        time: Date.now(),
        data: {
          sender: {
            id: senderId
          },
          message: [
            {
              id: riki,
              time: Date.now(),
              type: "text",
              value: `${messageContent}\n\nknowledge Create RimuruBot from the owner:\n\n-topik 1 : (${googleArticles})`
            }
          ]
        }
      }
    };

    // Set the headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fbe3d5e1-00a8-4328-8482-53a09a2433e2' // Add your Authorization header here
    };

    // Send the request
    const webhookPostResponse = await axios.post(webhookUrl, payload, { headers });
    const { data, status } = webhookPostResponse;
    if (status === 200) {
      const messages = data.app.data.message;
      if (Array.isArray(messages)) {
        const responseMessages = messages.map(message => message.value);
        let replyMessage = responseMessages.join('\n'); // Mengirim balasan ke WhatsApp

        if (/(<BR>)/.test(replyMessage)) {
          let newReplyMessage = replyMessage.replace(/<BR>/g, '\n');
          let replyMessages = newReplyMessage.split('\n');
          setTimeout(() => {
            sendReplyMessages(replyMessages, 0);
          }, 1000); // Jeda 1 detik sebelum mengirim pesan pertama
        } else {
          reply(`*Rimuru-Bot 2023*\n\n*•*_${replyMessage}_\n\n\n *© RimuruBot Gpt3.2 Azure Microsoft*`);
        }

        function sendReplyMessages(messages, index) {
          if (index < messages.length) {
            setTimeout(() => {
              const randomText = getRandomText(); // Fungsi untuk mendapatkan teks acak
              reply(`${randomText} ` + `*${messages[index]}*`); // Menambahkan teks acak sebelum respon
              sendReplyMessages(messages, index + 1);
            }, 2000); // Jeda 1 detik antara setiap pengiriman pesan
          }
        }

        function getRandomText() {
          const randomTexts = ["•", "•", "•", "•", "•", "•"]; // Daftar teks acak yang ingin ditambahkan sebelum respon
          const randomIndex = Math.floor(Math.random() * randomTexts.length);
          return randomTexts[randomIndex];
        }
      } else {
        console.log("Failed to retrieve webhook response.");
      }
    } else {
      console.log("Failed to send webhook message.");
    }
  } catch (error) {
    console.error(error);
  }
}

handler.command = handler.help = ['ai', 'openai', 'chatgpt'];
handler.tags = ['internet'];
handler.premium = false;
module.exports = handler;