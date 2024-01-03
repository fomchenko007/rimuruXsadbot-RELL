let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/oyasumi1.mp3";
	conn.sendFile(m.chat, vn, "oyasumi1.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(malam|oyasumi|oyasuminasai)$/i;
handler.command = new RegExp();
module.exports = handler