const fs = require('fs')
let handler = async (m, {
    conn,
    text
}) => {
    m.reply('Tunggu Sebentar, Sedang mengambil file Database')
    let sesi = await fs.readFileSync('./database.json')
    return await conn.sendMessage(m.chat, {
        document: sesi,
        mimetype: 'application/json',
        fileName: 'database.json'
    }, {
        quoted: m
    })
}
handler.help = ['getdb']
handler.tags = ['owner']
handler.command = /^(getdb)$/i

handler.rowner = true

<<<<<<< HEAD
module.exports = handler
=======
module.exports = handler
>>>>>>> 34e21f3863668ad556edda43ccf8609829bfeeb0
