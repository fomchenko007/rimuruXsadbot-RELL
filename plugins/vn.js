let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/kenapa.mp3";
	conn.sendFile(m.chat, vn, "kenapa.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix =
	/^(euphy|lia)$/i;
handler.command = new RegExp();

module.exports = handler
