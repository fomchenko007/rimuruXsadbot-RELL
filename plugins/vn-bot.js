let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/oy.mp3";
	conn.sendFile(m.chat, vn, "oy.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(bot|tes|p)$/i;
handler.command = new RegExp();

module.exports = handler
