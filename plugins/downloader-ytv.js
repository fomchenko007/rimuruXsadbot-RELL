const ytdl = require('ytdl-core');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const os = require('os');

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  await conn.sendMessage(m.chat, {
    react: {
      text: "â³",
      key: m.key,
    }
  });

  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;

  const videoUrl = text;

  const videoInfo = await ytdl.getInfo(videoUrl);
  const { videoDetails } = videoInfo;
  const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
  const thumbnail = thumbnails[0].url;

  const videoStream = ytdl(videoUrl, {
    quality: 'highestvideo',
  });

  const writableStream = fs.createWriteStream(`tmp/${title}.mp4`);

  await streamPipeline(videoStream, writableStream);

  let doc = {
    video: {
      url: `tmp/${title}.mp4`
    },
    mimetype: 'video/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: videoUrl,
        title: title,
        sourceUrl: videoUrl,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });

  fs.unlink(`tmp/${title}.mp4`, (err) => {
    if (err) {
      console.error(`Failed to delete video file: ${err}`);
    } else {
      console.log(`Deleted video file: tmp/${title}.mp4`);
    }
  });
};

handler.help = ['ytmp4'].map((v) => v + ' <YouTube Video URL>');
handler.tags = ['downloader'];
handler.command = /^(ytmp4)$/i;

handler.exp = 0;
handler.diamond = false;

module.exports = handler;