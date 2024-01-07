let fs = require('fs')
let handler = async (m, { conn, args, command }) => {
let qris = 'https://telegra.ph/file/68ed95f6f915aae73fa0a.jpg'
let dann =
`
ᴋᴀᴍᴜ ʙɪsᴀ ᴅᴏɴᴀsɪ ᴅɪ ɴᴏᴍᴏʀ ᴅɪʙᴀᴡᴀʜ ɪɴɪ
ᴀᴛᴀᴜ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ʟɪɴᴋ sᴀᴡᴇʀɪᴀ

│ ◦ *ᴅᴀɴᴀ* : 082257529886
│ ◦ *pulsa* : 082257529886
└ ◦ *sᴀᴡᴇʀɪᴀ* : https://saweria.co/Dimaskuyy

*Semoga Anda diberikan kemudahan rezeki dan dilipatgandakan rezeki Anda.*
`
 await conn.sendFile(m.chat, qris, 'qris.jpg', `${dann}`, m)
}

handler.help = ['donasi']
handler.tags = ['info', 'main']
handler.command = /^(donasi|donate)$/i
module.exports = handler