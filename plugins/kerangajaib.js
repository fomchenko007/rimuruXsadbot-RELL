let handler = async (m, {
    text,
    command,
    usedPrefix
}) => {
    if (!text) throw `Gunakan contoh ${usedPrefix}${command} apakah saya alien?`;
    m.reply(`"${[
        'Mungkin suatu hari',
        'Tidak juga',
        'Tidak keduanya',
        'Kurasa tidak',
        'Ya',
        'Coba tanya lagi',
        'Tidak ada'
    ].random()}."`);
};

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

handler.help = ['kerang', 'kerangajaib'].map(v => v + ' <teks>');
handler.tags = ['fun'];
handler.command = /^(kulit)?kerang(ajaib)?$/i;

module.exports = handler;