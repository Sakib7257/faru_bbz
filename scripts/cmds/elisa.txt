const axios = require("axios");


module.exports.config = {
  name: "elisa",
  aliases: ["janu", "janvi", "elisa"],
  version: "1.0.0",
  role: 0,
  author: "Anthony",
  description: "better then all Sim simi with multiple conversation",
  guide: { en: "[message]" },
  category: "ChatBots",
  coolDowns: 5,
};
module.exports.onReply = async function ({ api, event }) {
  if (event.type == "message_reply") {
    const reply = event.body
    if (isNaN(reply)) {

      const response = await axios.get(
        `http://65.109.80.126:20409/sim?ask=${encodeURIComponent(reply)}`,
      );
      const ok = response.data.respond;
      await api.sendMessage(
        ok,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: ok,
          });
        },
        event.messageID,
      );
    }
  }
};

module.exports.onChat = async function({
  event,
  api,
  message,
  getLang
}) {
  if (event.body && ["elisa", "janu", "janvi", "bby"].includes(event.body.toLowerCase())) {
    const greetings = [
      "𝗕𝗯𝘆 বলে অসম্মান করচ্ছিছ,😰😿",
      "দূরে যা, তোর কোনো কাজ নাই, শুধু 𝗯𝗯𝘆 𝗯𝗯𝘆 করিস  😉😋🤣",
      "তুই আমাকে 𝗕𝗯𝘆 বলে ডাকিস তোর বউ যদি শুনে তাহলে তোরে জুতা খুলে মুজা দিয়ে মারবে 😫🤣🤣",
      "ইস 𝗕𝗯𝘆 বলিস নারে এখন আমি বড় হইছি 😑😾😾",
      "এত গরম এ-ও তুই 𝗕𝗯𝘆 বলে ডাকস লজ্জা নাই তোর 😟😾😹",
      "বলেন Sir___🧟‍🧟‍",
      "বলো আমার ফুলটুসি____😻😽😽💙",
      "আজও কারো 𝗕𝗯𝘆 হতে পারলাম নাহ___😌💙💙",
      "আমি ঠিক সময় বিয়ে করলে ৩ বছর এর একটা bby থাকতো আর তুমি আমাকে 𝗕𝗯𝘆 বলছো__😾😾🤣",
      "𝗕𝗯𝘆 বললে চাকরি থাকবে না____😰😰☠",
      "এত 𝗕𝗯𝘆 𝗕𝗯𝘆 করস কেন কি হইছে বল___😾😾🔪🔪",
      "দূরে গিয়ে মর এত 𝗕𝗯𝘆 𝗕𝗯𝘆 না করে___😾😾🔪🔪"
    ];
    const mg = greetings[Math.floor(Math.random() * greetings.length)];
    await api.sendMessage(
      { body: mg },
      event.threadID,
      (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          link: mg,
        });
      },
      event.messageID,
    );
  }
};

module.exports.onStart = async function ({ api, args, event }) {
  try {
  const obfuscatedAuthor = String.fromCharCode(65, 110, 116, 104, 111, 110, 121);
         if (this.config.author !== obfuscatedAuthor) {
        return api.sendMessage("You are not authorized to change the author name.\n\nPlease author fix name  to work with this cmd", event.threadID, event.messageID);
         }
    const adnan = args.join(" ")
    const msg = args.join(" ").trim();
    if (!args[0]) {
      api.sendMessage(
        "Please type janu hii 🐰",
        event.threadID,
        event.messageID,
      );
      return;
    }

    if (args[0].toLowerCase() === "teach") {
        const input = msg.slice(5).trim();
        const parts = input.split('-');

        if (parts.length === 2) {
          const question = parts[0].trim();
          const answer = parts[1].trim();

          await axios.get(`http://65.109.80.126:20409/teach?ask=${question}&ans=${answer}`)

          return api.sendMessage(
            `🎓 𝐊𝐧𝐨𝐰𝐥𝐞𝐝𝐠𝐞 𝐮𝐧𝐥𝐨𝐜𝐤𝐞𝐝! 𝐓𝐚𝐮𝐠𝐡𝐭: "${question}" — 𝐄𝐧𝐠𝐥𝐢𝐬𝐡𝐭𝐞𝐧𝐞𝐝 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞: "${answer}". 𝐘𝐨𝐮𝐫 𝐰𝐢𝐬𝐝𝐨𝐦 𝐬𝐡𝐢𝐧𝐞𝐬 𝐛𝐫𝐢𝐠𝐡𝐭𝐞𝐫 𝐭𝐡𝐚𝐧 𝐚 𝐬𝐮𝐩𝐞𝐫𝐧𝐨𝐯𝐚!`,
            event.threadID,
            event.messageID
          );
        } else {
          return api.sendMessage(
            "📚 𝐓𝐨 𝐬𝐡𝐚𝐫𝐞 𝐲𝐨𝐮𝐫 𝐰𝐢𝐬𝐝𝐨𝐦, 𝐮𝐬𝐞: teach [question] - [answer]. 𝐒𝐡𝐚𝐫𝐢𝐧𝐠 𝐢𝐬 𝐜𝐚𝐫𝐢𝐧𝐠!",
            event.threadID,
            event.messageID
          );
        }
      }

      if (args[0].toLowerCase() === "list") {


        try {


         const data =  await axios.get(`http://65.109.80.126:20409/info`)

          return api.sendMessage(
            `Total so many Queries and Response have been answered\n\n➠ Total Queries: ${data.data.totalKeys}\n \n➠ Total Response: ${data.data.totalResponses}`,
            event.threadID,
            event.messageID
          );
        } catch (error) {
          return api.sendMessage(
            "Somethink went wrong",
            event.threadID,
            event.messageID
          );
        }
      }

    if (adnan) {

      const response = await axios.get(
        `http://65.109.80.126:20409/sim?ask=${adnan}`,
      );
      const mg = response.data.respond;
      await api.sendMessage(
        { body: mg },
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: mg,
          });
        },
        event.messageID,
      );
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(
      `${error.message}.\nAn error`,
      event.threadID,
      event.messageID,
    );
  }
};
