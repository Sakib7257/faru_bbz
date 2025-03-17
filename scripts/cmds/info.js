const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "2.2",
    author: "Anthony",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get bot & admin information with an image."
    },
    longDescription: {
      en: "Provides details about the bot and its administrator."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {
    const adminInfo = {
      name: "Fʌʀʜʌŋ Aʜɱɘɗ ",
      age: "17+",
      status: "𝐈𝐬𝐥𝐚𝐦",
      location: "𝐒𝐢𝐫𝐚𝐣𝐠𝐚𝐧𝐣,𝐒𝐚𝐝𝐨𝐫, 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡",
      instagram: "𝐅𝐀𝐑𝐇𝐀𝐍_𝐀𝐇𝐌𝐄𝐃 424",
      facebook: {
        name: "F A R H A N シ︎",
        link: "https://www.facebook.com/farhuu.2.0"
      },
      github: "Not Share "
    };

    const botInfo = {
      name: "✰→ ғᴀʀʜᴀɴ ʙᴏᴛ ←✰",
      prefix: "!"
    };

    const now = moment().tz('Asia/Dhaka');
    const currentTime = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const minutes = Math.floor((uptime / 60) % 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const imgurLink = "https://i.imgur.com/ZvEAvNE.mp4"; // Replace with a valid image URL

    const responseMessage = `
╭━─━─━─≪✠≫─━─━─━╮
      🎀 𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐎 🎀
╰━─━─━─≪✠≫─━─━─━╯
✧ 𝗡𝗮𝗺𝗲: ${adminInfo.name}
✧ 𝗔𝗴𝗲: ${adminInfo.age}
✧ 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: ${adminInfo.status}
✧ 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${adminInfo.location}
✧ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${adminInfo.facebook.name}
✧ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗟𝗶𝗻𝗸: ${adminInfo.facebook.link}
✧ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: ${adminInfo.instagram}
✧ 𝗚𝗶𝘁𝗛𝘂𝗯: ${adminInfo.github}

╭━─━─━─≪✠≫─━─━─━╮
       🎀 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🎀
╰━─━─━─≪✠≫─━─━─━╯
✧ 𝗡𝗮𝗺𝗲: ${botInfo.name}
✧ 𝗣𝗿𝗲𝗳𝗶𝘅: ${botInfo.prefix}
✧ 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptimeString}
✧ 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗧𝗶𝗺𝗲: ${currentTime}
  `;

    message.reply({
      body: responseMessage,
      attachment: await global.utils.getStreamFromURL(imgurLink)
    });
  }
};
