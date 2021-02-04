const storage = require('storage-to-json');
const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');
const { getMember, compare } = require('../../utils/functions.js');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = {
  config: {
    name: 'levels',
    aliases: ['leaderboard'],
    usage: '',
    category: 'Levels',
    description: 'Shows leaderboard',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    let toFind;
    if (args[1]) toFind = args[1]
    else toFind = message.author.username
    let userToCheck = getMember(message, toFind)
    const count = new storage(`${message.guild.id}`);

    let embed = new MessageEmbed()
      .setTitle(`Leaderboard`)
      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL)
      .setFooter(`© ${message.guild.me.displayName} | Developed By ${bot.users.cache.get(ownerid).tag}`, bot.user.displayAvatarURL())
      .setTimestamp();

    let objArray = [];
    count.each((messages, user) => {
      let obj = { messages, user }
      objArray.push(obj);
    });

    let unused = objArray.shift();
    objArray.sort(compare);
    let leaderboard = [];
    let n = 1
    objArray.slice(0, 10).forEach((x) => {
      let userKey;
      try {
        if (bot.users.cache.get(x.user)) {
          userKey = bot.users.cache.get(x.user).username;
        } else {
          userKey = bot.users.fetch(x.user).username;
        }
      }
      catch {
        userKey = "unknown"
      }
      leaderboard.push(`\`${n}\`\t**${userKey}** on **${x.messages}** messages`);
      n += 1;
    });

    let authorMessages = objArray.find((x) => x.user === message.author.id);
    let authPos = objArray.findIndex((x) => x.user === message.author.id) + 1;

    embed.addField(`You (${message.author.username}) are in position ${authPos} on ${authorMessages.messages} messages`, leaderboard);
    message.channel.send(embed);
  }
}