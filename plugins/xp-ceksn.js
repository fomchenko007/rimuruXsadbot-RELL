const { createHash } = require('crypto');

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let handler = async function (m, { conn, text, usedPrefix }) {
    let sn = createHash('md5').update(m.sender).digest('hex');

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png');

    conn.sendMessage(m.chat, {
        text: sn,
        contextInfo: {
            externalAdReply: {
                title: "",
                body: `ファイル ・「ムファル」`,
                thumbnailUrl: pp,
                sourceUrl: "https://chat.whatsapp.com/DXPU5F2cePXEaysvcImdUy",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['ceksn'];
handler.tags = ['xp'];
handler.command = /^(ceksn)$/i;
handler.register = true;

module.exports = handler;