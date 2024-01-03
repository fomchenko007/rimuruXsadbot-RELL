let util = require("util");
let path = require("path");

let handler = async (m, { conn }) => {
	let vn = "./loli/yare.mp3";
	conn.sendFile(m.chat, vn, "yare.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(yare|baiklah|ok|mengerti|siap)$/i;
handler.command = new RegExp();

module.exports = handler
