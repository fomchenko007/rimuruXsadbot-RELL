const fetch = require("node-fetch");

async function fetchJson(url, options = {}) {
  try {
    let res = await fetch(url, options);
    if (!res.ok) {
      console.error("Error Response:", res.status, res.statusText);
      throw new Error(`Error Response: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (e) {
    console.error("Fetch Error:", e);
    throw e;
  }
}

var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`Example: ${command} siapakah elon musk`);
  
  m.reply('Tunggu sebentar...');

  try {
    let data = await fetchJson(`https://kiicodeofficial.my.id/api/ai/bard2?query=${text}&apikey=Dzsyacans`);
    if (data && data.data && data.data.result) {
      const videoCaption = data.data.result;
      m.reply(`${videoCaption}`);
    } else {
      console.error("Response data tidak sesuai format yang diharapkan:", JSON.stringify(data));
      m.reply('Terjadi kesalahan dalam format data yang diterima.');
    }
  } catch (error) {
    console.error("Handler Error:", error.message);
    m.reply('Terjadi kesalahan saat memproses permintaan.');
  }
}

handler.command = handler.help = ["ai3"];
handler.tags = ["ai"];
handler.premium = false;
module.exports = handler;