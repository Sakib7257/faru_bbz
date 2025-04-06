module.exports = {
	config: {
		name: "balance",
		aliases: ["bal"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "xem số tiền hiện có của bạn hoặc người được tag",
			en: "view your money or the money of the tagged person"
		},
		category: "economy",
		guide: {
			vi: "   {pn}: xem số tiền của bạn"
				+ "\n   {pn} <@tag>: xem số tiền của người được tag",
			en: "   {pn}: view your money"
				+ "\n   {pn} <@tag>: view the money of the tagged person"
		}
	},

	langs: {
		vi: {
			money: "Bạn đang có %1",
			moneyOf: "%1 đang có %2"
		},
		en: {
			money: "You have %1",
			moneyOf: "%1 has %2"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		// Helper function to format the number
		const formatMoney = (amount) => {
			if (amount >= 1e9) return (amount / 1e9).toFixed(2) + "b";
			if (amount >= 1e6) return (amount / 1e6).toFixed(2) + "m";
			if (amount >= 1e3) return (amount / 1e3).toFixed(2) + "k";
			return amount.toString();
		};

		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), formatMoney(userMoney)) + "\n";
			}
			return message.reply(msg);
		}

		const userData = await usersData.get(event.senderID);
		message.reply(getLang("money", formatMoney(userData.money)));
	}
};
