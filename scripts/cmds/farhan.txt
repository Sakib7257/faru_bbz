module.exports = {
config: {
name: "farhan",
version: "1.0",
author: "NTKhang | edited by Farhan",
countDown: 5,
role: 0,
shortDescription: "no prefix",
longDescription: "no prefix",
category: "no prefix",
},

onStart: async function(){}, 
onChat: async function({ event, message, getLang }) {
if (event.body && event.body.toLowerCase() === "farhan") {
return message.reply({
body: " ──────────◊\n  ❥➳ 𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗮𝗹𝗮𝗶𝗸𝘂𝗺 ★★  \n\n  ❥➳ 𝗥𝗮𝗺𝗮𝗱𝗮𝗻 𝗞𝗮𝗿𝗲𝗲𝗺 ★★ \n\n  𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 \n 𝐅𝐀𝐑𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 ✦✼ ",
attachment: await global.utils.getStreamFromURL("https://i.imgur.com/mMH0N1S.mp4")
});
}
}
}
