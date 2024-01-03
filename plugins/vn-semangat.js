let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/gambare.mp3";
	conn.sendFile(m.chat, vn, "gambare.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(semangat|capek|cape|gambare|ganbatte)$/i;
handler.command = new RegExp();

module.exports = handler