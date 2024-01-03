const fetch = require("node-fetch");

const link = "https://data.bmkg.go.id/DataMKG/TEWS/";

module.exports = async function handler(m, { conn, text, usedPrefix, command }) {
    try {
        let anu = await (await fetch(link + "autogempa.json")).json();
        anu = anu.Infogempa.gempa;
        let txt = `🌐 *Wilayah:* ${anu.Wilayah}\n📅 *Tanggal:* ${anu.Tanggal}\n🕒 *Waktu:* ${anu.Jam}\n💢 *Potensi:* ${anu.Potensi}\n\n📏 *Magnitude:* ${anu.Magnitude}\n🌊 *Kedalaman:* ${anu.Kedalaman}\n📍 *Koordinat:* ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${anu.Dirasakan}` : ""}`;
        let msg = await conn.sendMessage(m.chat, {
            location: {
                degreesLatitude: anu.Coordinates.split(",")[0],
                degreesLongitude: anu.Coordinates.split(",")[1],
                name: anu.Coordinates,
                contextInfo: {
                    externalAdReply: {
                        title: "🌍 Info Gempa Terkini 🌋",
                        body: anu.Potensi,
                        renderLargerThumbnail: true,
                        mediaUrl: "",
                        mediaType: 1,
                        thumbnail: await (await conn.getFile(link + anu.Shakemap)).data,
                        sourceUrl: ""
                    }
                }
            }
        }, { quoted: m });
        await conn.reply(m.chat, txt.replaceAll("%p", "```"), msg);
    } catch (e) {
        console.log(e);
        try {
            let anu = await (await fetch(link + "gempaterkini.json")).json();
            anu = anu.Infogempa.gempa[0];
            let txt = `🌐 *Wilayah:* ${anu.Wilayah}\n📅 *Tanggal:* ${anu.Tanggal}\n🕒 *Waktu:* ${anu.Jam}\n💢 *Potensi:* ${anu.Potensi}\n\n📏 *Magnitude:* ${anu.Magnitude}\n🌊 *Kedalaman:* ${anu.Kedalaman}\n📍 *Koordinat:* ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${anu.Dirasakan}` : ""}`;
            let msg = await conn.sendMessage(m.chat, {
                location: {
                    degreesLatitude: anu.Coordinates.split(",")[0],
                    degreesLongitude: anu.Coordinates.split(",")[1],
                    name: anu.Coordinates,
                    contextInfo: {
                        externalAdReply: {
                            title: "🌍 Info Gempa Terkini 🌋",
                            body: anu.Potensi,
                            renderLargerThumbnail: true,
                            mediaUrl: "",
                            mediaType: 1,
                            thumbnail: await (await conn.getFile(link + anu.Shakemap)).data,
                            sourceUrl: ""
                        }
                    }
                }
            }, { quoted: m });
            await conn.reply(m.chat, txt.replaceAll("%p", "```"), msg);
        } catch (e) {
            console.log(e);
            m.reply(`[!] Maaf, fitur ini sedang bermasalah.`);
        }
    }
};

module.exports.help = ["infogempa"];
module.exports.tags = ["info"];
module.exports.command = /^(infogempa)$/i;
module.exports.limit = true;