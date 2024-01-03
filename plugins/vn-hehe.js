let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/menu.mp3";
	conn.sendFile(m.chat, vn, "menu.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix =
	/^(favorite)$/i;
handler.command = new RegExp();

module.exports = handler
