let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/salam.mp3";
	conn.sendFile(m.chat, vn, "salam.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix =
	/^(assalamualaikum|salam|asalamualaikum|assalam|asalam|salam|salom|shalom)$/i;
handler.command = new RegExp();

module.exports = handler
