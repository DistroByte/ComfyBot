const storage = require('storage-to-json');
const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');
const { getMember, compare } = require('../../functions.js');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = {
  config: {
    name: 'messagecount',
    description: 'Returns the number of messages since bot started counting per user',
    category: 'basic',
    accessableby: 'Members',
    aliases: ['messages']
  },
  run: async (bot, message, args) => {
    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let memberXp = guildLevels.memberXp
    let xp = memberXp.get(message.author.id)
    function getLevel(xp) {
      return level = Math.floor((((3888 * xp ** 2 + 291600 * xp - 207025) ** (0.5) / (40 * 3 ** (3 / 2)) + ((3 * (3 * xp)) / 5 + 2457 / 4) / 6 - 729 / 8) ** (1 / 3) + 61 / (12 * ((3888 * xp ** 2 + 291600 * xp - 207025) ** (0.5) / (40 * 3 ** (3 / 2)) + ((3 * (3 * xp)) / 5 + 2457 / 4) / 6 - 729 / 8) ** (1 / 3)) - 9 / 2))
    }
    function getCommunitiveXp(lvl) {
      return communitive = ((5 * lvl * lvl * lvl) / 3) + ((45 * lvl * lvl) / 2) + ((455 * lvl) / 6)
    }
    function getLevelXp(lvl) {
      return levelXp = 5 * Math.floor(lvl / 1) ** 2 + 50 * Math.floor(lvl / 1) + 100
    }

    console.log(getLevel(xp));
    console.log(xp - getCommunitiveXp(getLevel(xp)));
    console.log(getLevelXp(getLevel(xp)))
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
      if (bot.users.cache.get(x.user)) {
        userKey = bot.users.cache.get(x.user).username;
      } else {
        userKey = bot.users.fetch(x.user).username;
      }
      leaderboard.push(`\`${n}\`\t**${userKey}** on **${x.messages}** messages`);
      n = n + 1;
    });

    let authorMessages = objArray.find((x) => x.user === message.author.id);
    let authPos = objArray.findIndex((x) => x.user === message.author.id) + 1;

    embed.addField(`You (${message.author.username}) are in position ${authPos} on ${authorMessages.messages} messages`, leaderboard);
    message.channel.send(embed);
  },
};