const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const {
    pinterest
} = require("@bochilteam/scraper");
const {
    readFileSync
} = require("fs");
const hxz = require("hxz-api").default;

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("Input query link\nExample: *.pinterest* jokowi")
    await m.reply(wait)

    let res1, res2, res3, res4, res5;
    let tag = `@${m.sender.split('@')[0]}`;

    try {
        res1 = await searchPinterest(text);
        if (res1) {
            let v1img = res1.result.getRandom();
            let isImagev1 = await detectImage(v1img);
            if (isImagev1) {
                await conn.sendMessage(m.chat, {
                    image: {
                        url: v1img
                    },
                    caption: `🔍 *[ RESULT V1 ]*\nRequest by: ${tag}`,
                    mentions: [m.sender]
                }, {
                    quoted: m
                });
            }
        }
    } catch (error) {
        try {
            res2 = await bochilPinterestImages(text);
            if (res2) {
                let v2img = res2.getRandom();
                let isImagev2 = await detectImage(v2img);
                if (isImagev2) {
                    await conn.sendMessage(m.chat, {
                        image: {
                            url: v2img
                        },
                        caption: `🔍 *[ RESULT V2 ]*\nRequest by: ${tag}`,
                        mentions: [m.sender]
                    }, {
                        quoted: m
                    });
                }
            }
        } catch (error) {
            try {
                // ... (unchanged code)
            } catch (error) {
                try {
                    res4 = await hxzPinterestImages(text);
                    if (res4) {
                        let v4img = res4.getRandom();
                        let isImagev4 = await detectImage(v4img);
                        if (isImagev4) {
                            await conn.sendMessage(m.chat, {
                                image: {
                                    url: v4img
                                },
                                caption: `🔍 *[ RESULT V4 ]*\nRequest by: ${tag}`,
                                mentions: [m.sender]
                            }, {
                                quoted: m
                            });
                        }
                    }
                } catch (error) {
                    try {
                        let response = await fetch("https://api.lolhuman.xyz/api/pinterest2?apikey=" + lolkey + "&query=" + text);
                        res5 = await response.json();
                        if (res5) {
                            let v5img = res5.result.getRandom();
                            let isImagev5 = await detectImage(v5img);
                            if (isImagev5) {
                                await conn.sendMessage(m.chat, {
                                    image: {
                                        url: v5img
                                    },
                                    caption: `🔍 *[ RESULT V5 ]*\nRequest by: ${tag}`,
                                    mentions: [m.sender]
                                }, {
                                    quoted: m
                                });
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        await m.reply("An error occurred");
                    }
                }
            }
        }
    }
}

handler.help = ["pinterest"];
handler.tags = ["internet"];
handler.command = /^(pinterest2|pin2)$/i;
module.exports = handler;

/* New Line */
// ... (unchanged code)