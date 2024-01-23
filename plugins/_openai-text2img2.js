const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
    if (!text) throw '😇 Apa yang ingin kamu buat?';
  
    let msg = encodeURIComponent(text);
    let res = await fetch(`https://aemt.me/ai/text2img?text=${msg}`);
    
    // Periksa jika permintaan berhasil
    if (!res.ok) throw `❌ Kesalahan ${res.status}: ${res.statusText}`;
    
    let buffer = await res.buffer();
    conn.sendFile(m.chat, buffer, 'image.png', `${text}`, m);
}

handler.help = ['text2img2 <query>'];
handler.tags = ['ai'];
handler.command = /^text2img2$/i;

module.exports = handler;
