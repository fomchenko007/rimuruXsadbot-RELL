const stickerFormatter = require("wa-sticker-formatter");

const daduHandler = async (m, { conn }) => {
    await m.reply(wait);
    let diceImage = rollDice();
    let stiker = await stickerFormatter.createSticker(diceImage, { pack: packname, author: m.name });
    await conn.sendFile(m.chat, stiker, "dadu.webp", "", m);
};

daduHandler.help = ["dadu"];
daduHandler.tags = ["game"];
daduHandler.command = ["dadu"];

module.exports = daduHandler;

function rollDice() {
    return "https://www.random.org/dice/dice" + (Math.floor(Math.random() * 6) + 1) + ".png";
}