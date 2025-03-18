module.exports = { 
  config: { 
    name: "p", 
    version: "1.0", 
    author: "BaYjid 👽", 
    countDown: 5, 
    role: 2, 
    shortDescription: { vi: "", en: "" }, 
    longDescription: { vi: "", en: "" }, 
    category: "pending" 
  },

  langs: { 
    en: { 
      invalidNumber: "❌ 『%1』 is not a valid number!", 
      cancelSuccess: "❌ Refused 『%1』 thread(s)!", 
      approveSuccess: "✅ Approved 『%1』 thread(s) successfully!", 
      cantGetPendingList: "⚠️ Can't get the pending list!", 
      returnListPending: "🟢『PENDING』🟢\n\n❮ Total threads to approve: 『%1』❯\n\n%2", 
      returnListClean: "🟡『PENDING』🟡\nNo pending threads found!"
    } 
  },

  onReply: async function ({ api, event, Reply, getLang }) { 
    if (String(event.senderID) !== String(Reply.author)) return; 
    const { body, threadID, messageID } = event; 
    let count = 0;

    const isCancel = body.toLowerCase().startsWith("c") || body.toLowerCase().startsWith("cancel");
    const indices = body.replace(/^[cC]ancel?\s*/, "").split(/\s+/);

    for (const index of indices) {
      const num = parseInt(index);
      if (isNaN(num) || num <= 0 || num > Reply.pending.length) {
        return api.sendMessage(getLang("invalidNumber", num), threadID, messageID);
      }

      if (isCancel) {
        api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[num - 1].threadID);
      } else {
        api.sendMessage(
          `🔷🔹🔷 𝑇ℎ𝑎𝑛𝑘 𝑦𝑜𝑢 𝑓𝑜𝑟 𝑖𝑛𝑣𝑖𝑡𝑖𝑛𝑔 𝑚𝑒! 🔷🔹🔷\n\n🚀 𝐿𝑒𝑡'𝑠 𝑔𝑒𝑡 𝑠𝑡𝑎𝑟𝑡𝑒𝑑!\n\n🔹 𝐵𝑜𝑡 𝑃𝑟𝑒𝑓𝑖𝑥: 『%1』\n🔹 𝑇𝑜 𝑣𝑖𝑒𝑤 𝑎𝑣𝑎𝑖𝑙𝑎𝑏𝑙𝑒 𝑐𝑜𝑚𝑚𝑎𝑛𝑑𝑠, 𝑡𝑦𝑝𝑒: 『%1help』\n\n📚 𝑁𝑒𝑒𝑑 ℎ𝑒𝑙𝑝? 𝐹𝑒𝑒𝑙 𝑓𝑟𝑒𝑒 𝑡𝑜 𝑎𝑠𝑘! 🎯`,
          Reply.pending[num - 1].threadID
        );
      }
      count++;
    }

    return api.sendMessage(getLang(isCancel ? "cancelSuccess" : "approveSuccess", count), threadID, messageID);
  },

  onStart: async function ({ api, event, getLang, commandName }) { 
    const { threadID, messageID } = event; 
    let msg = "", index = 1;

    try {
      const spam = (await api.getThreadList(100, null, ["OTHER"])) || [];
      const pending = (await api.getThreadList(100, null, ["PENDING"])) || [];
      const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

      for (const BaYjid of list) {
        msg += `🔹『${index++}』 ${BaYjid.name} 『${BaYjid.threadID}』\n`;
      }

      if (list.length !== 0) {
        return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
          });
        }, messageID);
      } else {
        return api.sendMessage(getLang("returnListClean"), threadID, messageID);
      }
    } catch (e) {
      return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID);
    }
  }
};
