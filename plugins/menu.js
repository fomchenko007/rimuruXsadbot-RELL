const { BufferJSON, 
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
proto, 
generateWAMessageContent, 
generateWAMessage, 
prepareWAMessageMedia, 
areJidsSameUser, 
getContentType 
} = require('@adiwajshing/baileys')
process.env.TZ = 'Asia/Jakarta'
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
let tags = {
  'main': 'MENU UTAMA',
  'xp': 'MENU EXP',
  'rpgabsen': 'MENU RPGABSEN',
  'owner': 'MENU OWNER',
  'ai': 'MENU AI',
  'downloader': 'MENU DOWNLOADER',
  'sticker': 'MENU CONVERT',
  'fun': 'MENU FUN',
  'game': 'MENU GAME',
  'genshin': 'MENU GENSHIN',
  'rpg': 'MENU RPG',
  'anime': 'MENU ANIME',
  'group': 'MENU GROUP', 
  'info': 'MENU INFO',
  'internet': 'INTERNET',
  'islami' : 'MENU ISLAMI',
  'kerang': 'MENU KERANG',
  'maker': 'MENU MAKER',
  'image': 'MENU IMAGE',
  'nsfw': 'MENU NSFW',
  'Pengubah Suara': 'PENGUBAH SUARA',
  'quotes' : 'MENU QUOTES',
  'stalk': 'MENU STALK',
  'shortlink': 'SHORT LINK',
  'tools': 'MENU TOOLS',
  'advanced': 'ADVANCED',
  'anonymous': 'ANONYMOUS CHAT',
}

const defaultMenu = {
  before: `
Hi %name
*私は、何かをしたり、検索したり、データ/情報を取得したりするのに役立つ自動システム (whatsapp ボット) ですが、whatsapp です* 

  乂  *S T A T I S T I C*

. .╭── ︿︿︿︿︿ .   .   .   .   .   . 
. .┊ ‹‹ *ɴᴀᴍᴇ* :: %name
. .┊•*⁀➷ °... ℛᥱᥲd thι᥉ ...
. .╰─── ︶︶︶︶ ♡⃕  ⌇. . .
. . ┊⿻ [ *ʀᴜɴᴛɪᴍᴇ* :: %muptime] . .
. . ┊⿻ [ *ᴘʀᴇғɪx* :: <%p>] . .
. . ┊⿻ [ *ᴅᴀᴛᴀʙᴀsᴇ* :: %totalreg] . .
. . ┊⿻ [ *ᴅᴀᴛᴇ* :: %date]. . 
. . ┊⿻ [ *ᴘʟᴀᴛғᴏʀᴍ* :: linux]. . 
. . ┊⿻ [ *ʟɪʙʀᴀʀʏ* :: @whiskeysocket/baileys]. . 
. . ┊⿻ [ *ᴄʀᴇᴀᴛᴏʀ* :: dmss slbeww]. . 
. . ╰─────────╮

*Jika menemukan error silahkan laporkan ke owner dengan mengetik .report*

`.trimStart(),
  header: '─₍🍁₎❝┊ *%category*',
  body: `┊꒱ 🎋   *%cmd* %islimit %isPremium `,
  footer: '╰─── –',
  after: `Rimuru ᴀɪ By Dmsss`,
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name =  `@${m.sender.split`@`[0]}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    const wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
  for (let plugin of help)
    if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
            if (!(tag in tags) && tag) tags[tag] = tag
conn.menu = conn.menu ? conn.menu : {}
let before = conn.menu.before || defaultMenu.before
let header = conn.menu.header || defaultMenu.header
let body = conn.menu.body || defaultMenu.body
let footer = conn.menu.footer || defaultMenu.footer
let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
let _text = [
    before,
    ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                return menu.help.map(help => {
                    return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                        .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                        .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                        .trim()
                }).join('\n')
            }),
            footer
        ].join('\n')
    }),
    after
].join('\n')
text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, wib, wit, wita, time, totalreg, rtotalreg, role
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  conn.relayMessage(m.chat, {
  extendedTextMessage:{
                text: text, 
                contextInfo: {
                mentionedJid: [m.sender],
                     externalAdReply: {
                        title: date,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/e5b5c47a3030f60410044.jpg',
                        sourceUrl: 'https://chat.whatsapp.com/DXPU5F2cePXEaysvcImdUy'
                    }
                }, mentions: [m.sender]
}}, {})
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(allmenu|menu|help|bot)$/i

handler.exp = 3

module.exports = handler


function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}