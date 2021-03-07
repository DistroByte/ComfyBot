const json = require('../../package.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    name: 'stats',
    description: 'Displays some useful stats about the bot',
    category: 'info',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    // function duration(ms) {
    //   const sec = Math.floor((ms / 1000) % 60).toString();
    //   const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    //   const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
    //   const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    //   return `${days} days, ${hrs} hrs, ${min} mins, ${sec} secs`;
    // }

    // let memUsage = process.memoryUsage().rss / 1024 / 1024;
    // let users = client.users.cache.size;
    // let servers = client.guilds.cache.size;
    // let channels = client.channels.cache.size
    // let nodeVersion = process.version;
    // let djsVersion = json.dependencies["discord.js"].slice(1);

    // message.channel.send(`\`\`\`apache\n= STATISTICS =\n• Memory_Usage   : : ${Math.round(memUsage * 100) / 100} MB\n• Uptime         : : ${duration(client.uptime)}\n• Total_Users    : : ${users}\n• Total_Channels : : ${channels}\n• Total_Servers  : : ${servers}\n• NodeJS_Version : : ${nodeVersion}\n• DJS_Version    : : v${djsVersion}\`\`\``);
    const embed = new MessageEmbed().setDescription(`[View the current bot stats here!](https://stats.dbyte.xyz/)`)
    message.channel.send(embed);
  },
};


