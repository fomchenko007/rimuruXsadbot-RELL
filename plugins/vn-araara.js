let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/ara.mp3";
	conn.sendFile(m.chat, vn, "ara.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix =
	/^(ara ara|Ara ara|Ara-ara|ara-ara)$/i;
handler.command = new RegExp();

module.exports = handler
