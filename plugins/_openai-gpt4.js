const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
    if (!text) throw 'ada yang bisa gpt4 bantu?'
  
    let msg = encodeURIComponent(text)
    let res = await fetch(`https://aemt.me/v2/gpt4?text=${msg}`)
    let data = await res.json()
    console.log(data)
    conn.sendText(m.chat, data.result)
   
}
handler.help = ['gpt4 <query>']
handler.tags = ['ai']
handler.command = /^gpt4$/i
handler.premium = true

module.exports = handler;
