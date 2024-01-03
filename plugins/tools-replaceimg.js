const uploadFile = require('../lib/uploadFile.js');
const uploadImage = require('../lib/uploadImage.js');
const fetch = require('node-fetch');
const Replicate = require('replicate');

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    text,
    command
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'No media found';
    let media = await q.download();
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link = await (isTele ? uploadImage : uploadFile)(media);
    let model =
        "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478";
    if (link) {
        await m.reply(wait);
        let hasil = await imgReplicate(link, model, "3a4886dd3230e523600d3b555f651dc82aba3a4e");
        await conn.sendFile(m.chat, hasil[0], "result", "Result:\n", m);
    } else throw eror;
};
handler.help = ['replicateimg'];
handler.tags = ['tools'];
handler.command = /^replicateimg$/i;
module.exports = handler;

async function imgReplicate(img, models, ApiKey) {
    const replicate = new Replicate({
        auth: ApiKey
    });
    const input = {
        img: img
    };
    const output = await replicate.run(models, {
        input
    });
    return output;
}