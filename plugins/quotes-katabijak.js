const fs = require('fs');

function handler(message) {
  let body = fs.readFileSync('./lib/katabijak.txt', 'utf-8');
  let splitnix = body.split('\n');
  let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)];
  message.reply(randomnix);
}

handler.help = ['katabijak'];
handler.tags = ['quotes'];
handler.command = /^(katabijak|jagokata)$/i;

module.exports = handler;