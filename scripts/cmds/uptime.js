const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    config: {
        name: "uptime",
        aliases: ["up", "upt"],
        version: "1.2",
        author: "VEX_ADNAN",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Shows system uptime and info."
        },
        longDescription: {
            en: "Displays runtime, memory, CPU, and other system details."
        },
        category: "SYSTEM",
        guide: {
            en: "{pn}"
        }
    },

    onStart: async function ({ message, event, args, api, usersData, threadsData }) {
        const iURL = "https://i.imgur.com/vJJbdxB.jpeg"; // Fixed photo link
        const uptime = process.uptime();
        const s = Math.floor(uptime % 60);
        const m = Math.floor((uptime / 60) % 60);
        const h = Math.floor((uptime / (60 * 60)) % 24);
        const upSt = `${h}H ${m}M ${s}S`;

        let threadInfo = await api.getThreadInfo(event.threadID);
        const males = threadInfo.userInfo.filter(user => user.gender === "MALE").length;
        const females = threadInfo.userInfo.filter(user => user.gender === "FEMALE").length;
        const users = await usersData.getAll();
        const threads = await threadsData.getAll();

        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const system = `${os.platform()} ${os.release()}`;
        const model = `${os.cpus()[0].model}`;
        const cores = os.cpus().length;
        const processMemory = prettyBytes(process.memoryUsage().rss);

        const stylishMessage = `
🔥 𝙎𝙮𝙨𝙩𝙚𝙢 𝙎𝙩𝙖𝙩𝙪𝙨 𝙍𝙚𝙥𝙤𝙧𝙩 🔥

⏳ 𝗨𝗽𝘁𝗶𝗺𝗲: *${upSt}*
👨 𝗠𝗮𝗹𝗲𝘀: *${males}*  
👩 𝗙𝗲𝗺𝗮𝗹𝗲𝘀: *${females}*  
🌍 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀: *${users.length}*  
🏠 𝗧𝗼𝘁𝗮𝗹 𝗚𝗿𝗼𝘂𝗽𝘀: *${threads.length}*  

💻 𝗢𝗦: *${system}*  
⚙️ 𝗖𝗣𝗨 𝗠𝗼𝗱𝗲𝗹: *${model}*  
🔢 𝗖𝗼𝗿𝗲𝘀: *${cores}*  

📂 𝗠𝗲𝗺𝗼𝗿𝘆 𝗨𝘀𝗮𝗴𝗲: *${prettyBytes(usedMemory)} / ${prettyBytes(totalMemory)}*  
🔋 𝗣𝗿𝗼𝗰𝗲𝘀𝘀 𝗠𝗲𝗺𝗼𝗿𝘆: *${processMemory}*  

🚀 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 
𝑻𝒂𝒏𝒋𝒊𝒓𝒐_𝒌𝒂𝒎𝒂𝒅𝒐_🐥🌸
`;

        message.reply({
            body: stylishMessage,
            attachment: await global.utils.getStreamFromURL(iURL)
        }, event.threadID);
    }
};

async function getDiskUsage() {
    const { stdout } = await exec('df -k /');
    const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);
    return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };
}

function prettyBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
 }
