const { createHash } = require('crypto');
const fetch = require('node-fetch');

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let handler = async function (m, { text, usedPrefix, command }) {
    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    let namae = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "./src/avatar_contact.png");
    if (user.registered === true) throw `Kamu Sudah Terdaftar Di Database, Apa Kamu Ingin Mendaftar Ulang? *${usedPrefix}unreg`;
    if (!Reg.test(text)) return m.reply(`Masukkan Nama.UmurKamu\nContoh: .daftar manusia.18`);
    let [_, name, splitter, age] = text.match(Reg);
    if (!name) throw 'Nama Tidak Boleh Kosong';
    if (!age) throw 'Umur Tidak Boleh Kosong';
    age = parseInt(age);
    if (age > 30) throw 'WOI TUA (。-`ω´-)'; // Adjust the age limit as needed
    if (age < 5) throw 'Halah dasar bocil';
    user.name = name.trim();
    user.age = age;
    user.regTime = + new Date();
    user.registered = true;
    let sn = createHash('md5').update(m.sender).digest('hex');
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;
    let cap = `
╭┏─• *USER*
│◉ *sᴛᴀᴛᴜs:*  sᴜᴄᴄᴇssғᴜʟ ✓
│◉ *ɴᴀᴍᴇ:* ${namae}
│◉ *ᴀɢᴇ:* ${age} ʏᴇᴀʀs
┗───•
 ◉ *sɴ:* ${sn}
 
ᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ʙᴀᴄᴀ ʀᴜʟᴇs ʏᴀ ᴋᴀᴋ...
ᴅᴀᴛᴀ ᴜsᴇʀ ʏᴀɴɢ ᴛᴇʀsɪᴍᴘᴀɴ ᴅɪᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ, ᴅɪᴊᴀᴍɪɴ ᴀᴍᴀɴ ᴛᴀɴᴘᴀ ᴛᴇʀsʜᴀʀᴇ 📁\n*.menu [Menampilkan Semua Fitur]*

`;
    await conn.sendMessage(m.chat, { image: { url: pp }, caption: cap }, m);
};

handler.help = ['daftar', 'register'];
handler.tags = ['xp'];
handler.command = /^(daftar|verify|reg(ister)?)$/i;

module.exports = handler;