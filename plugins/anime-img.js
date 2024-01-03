const fetch = require('node-fetch');
const { webp2mp4 } = require('../lib/webp2mp4.js');
const uploadImage = require('../lib/uploadImage.js');

const handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    let url;

    if (/image\/(jpe?g|png)/.test(mime)) {
        const img = await q.download?.();
        url = await uploadImage(img);
    } else if (args[0] && isImageURL(args[0])) {
        url = args[0];
    } else return m.reply(`â Reply an image with command ${usedPrefix + command}`);

    await m.reply(wait);

    try {
        const result = await fetchAnimeData(url);
        if (!result || result.length === 0) {
            return m.reply('â Error: Tidak dapat melacak anime.');
        }

        const {
            anilist: { id = 'Tidak diketahui', idMal = 'Tidak diketahui', title = {}, synonyms, isAdult },
            filename,
            episode = 'Tidak diketahui',
            from,
            to,
            similarity,
            video,
            image,
        } = result[0];

        const nativeTitle = title.native || 'Tidak diketahui';
        const romajiTitle = title.romaji || 'Tidak diketahui';
        const englishTitle = title.english || 'Tidak diketahui';

        let message = `ðº *Anime ID:* ${id}\nð *MyAnimeList ID:* ${idMal}\nð *Native Title:* ${nativeTitle}\nð­ *Romaji:* ${romajiTitle}\nðºð¸ *English:* ${englishTitle}\n`;

        if (synonyms && synonyms.length > 0) {
            message += `ð *Synonyms:* ${synonyms.join(', ')}\n`;
        }

        message += `ð *Adult:* ${isAdult ? 'Yes' : 'No'}\n`;
        message += `ð *Similarity:* ${similarity ? similarity.toFixed(2) : 'Tidak diketahui'}%\n`;
        message += `â° *Time:* ${from ? formatDuration(from * 1000) : 'Tidak diketahui'} - ${to ? formatDuration(to * 1000) : 'Tidak diketahui'}\n`;

        if (episode !== 'Tidak diketahui') {
            message += `ð¬ *Episode:* ${episode}\n`;
        }

        let webpbuffer = await mp4ToWebp(await (await conn.getFile(video)).data, {
            pack: packname,
            author: m.name,
        });
        let outbuffer = await webp2mp4(webpbuffer);
        await conn.sendFile(m.chat, outbuffer, '', message, m);
    } catch (error) {
        console.error(error);
        return m.reply('â Terjadi kesalahan saat mencari anime.');
    }
};

handler.help = ["animeimg *Reply image*"];
handler.tags = ["anime"];
handler.command = /^(animeimg)$/i;

module.exports = handler;

// Fungsi untuk memeriksa apakah URL adalah link gambar
function isImageURL(url) {
    const imageRegex = /\.(jpeg|jpg|png|webp)$/i;
    return imageRegex.test(url);
}

// ... (rest of the code remains unchanged)