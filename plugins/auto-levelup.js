const { canLevelUp, xpRange } = require('../lib/levelling.js');
const { levelup } = require('../lib/canvas.js');

async function before(m) {
  let user = global.db.data.users[m.sender];
  if (!user.autolevelup) return !0;
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    throw `
Level ${user.level} 📊
*${user.exp - min} / ${xp}*
Kurang *${max - user.exp}* lagi! ✨
`.trim();
  }
  let before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    let teks = `Selamat ${this.getName(m.sender)} naik 🧬level\n.             ${user.role}`;
    let str = `${this.getName(m.sender)} naik 🧬level\n.             ${user.role}

*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

• 🧬Level Sebelumnya : ${before}
• 🧬Level Baru : ${user.level}
• Pada Jam : ${new Date().toLocaleString('id-ID')}

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim();

    try {
      let img = await levelup(teks, user.level);
      await this.sendFile(m.chat, img, "", str, m);
    } catch (e) {
      await this.sendFile(m.chat, fail + "levelup", "", str, m);
    }
  }
}

module.exports = { before };