let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/konichiwa.mp3";
	conn.sendFile(m.chat, vn, "konnichiwa.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(konichiwa|siang|konnichiwa)$/i;
handler.command = new RegExp();

module.exports = handler
