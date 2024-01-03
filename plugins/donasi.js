let fs = require('fs')
let handler = async (m, { conn, args, command }) => {
let qris = 'https://telegra.ph/file/68ed95f6f915aae73fa0a.jpg'
let dann =
`
┏━━━ꕥ〔 *NOMOR* 〕ꕥ━⬣ 
┃Dana: 082257529886
┃Pulsa: 082257529886 ( telkomsel )
┗━━━ꕥ
┏━━━ꕥ〔 *Website* 〕ꕥ━⬣ 
┃Saweria: https://saweria.co/Dimaskuyy
┃
┃Setelah melakukan donasi kirim bukti 
┃pembayaran ke owner
┃
┃Thanks for Donationing!
┗━━━ꕥ
`
 await conn.sendFile(m.chat, qris, 'qris.jpg', `${dann}`, m)
}

handler.help = ['donasi']
handler.tags = ['info', 'main']
handler.command = /^(donasi|donate)$/i
module.exports = handler