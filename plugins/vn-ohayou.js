let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/ohayo1.mp3";
	conn.sendFile(m.chat, vn, "ohayou.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(ohayou|ohayo|pagi)$/i;
handler.command = new RegExp();

module.exports = handler
