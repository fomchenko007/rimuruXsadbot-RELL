const fs = require('fs');
const moment = require('moment-timezone');

const handler = async (m, { conn, usedPrefix, __dirname, text, command }) => {
  const tag = `@${m.sender.replace(/@.+/, '')}`;
  const mentionedJid = [m.sender];
  const name = conn.getName(m.sender);
  const cin = `${pickRandom(global.pantun)}`;
  m.reply(cin);
};

handler.help = ['pantun'];
handler.tags = ['quotes'];
handler.command = /^(pantun)$/i;
handler.limit = true;

module.exports = handler;

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH');
  let res = "Selamat Malam";
  if (time >= 4) {
    res = "Selamat Pagi";
  }
  if (time >= 10) {
    res = "Selamat Siang";
  }
  if (time >= 15) {
    res = "Selamat Sore";
  }
  if (time >= 18) {
    res = "Selamat Malam";
  }
  return res;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

global.pantun = [
  'Ada anak kecil bermain batu,\nBatu dilempar masuk ke sumur,\nBelajar itu tak kenal waktu,\nJuga tidak memandang umur. ',
  // ... (sisa array pantun)
];