const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');
const { getLevel } = require('../../utils/functions.js');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = {
  config: {
    name: 'levels',
    aliases: ['leaderboard', 'ranks'],
    category: 'ranking',
    description: 'Shows leaderboard',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    user = message.author

    let memberXp = guildLevels.memberXp
    let xp = memberXp.get(user.id)
    let leaderboard = []

    var sortable = new Map([...memberXp.entries()].sort(function (a, b) {
      return b[1] - a[1];
    }));

    var authRank = 1;
    var ranks = 1
    for (var [key, value] of sortable.entries()) {
      if (key == user.id) {
        authRank = ranks
      }
      leaderboard.push(`\`${ranks}\` **${message.guild.members.cache.get(key)}** *at lvl* ${getLevel(value)}`)
      ranks += 1
    }

    const page = 1

    let embed = new MessageEmbed()
      .setTitle(`Leaderboard`)
      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL)
      .setFooter(`Page ${page}`)

    let slice = 0;
    if (leaderboard.length >= 10) {
      slice = 10
    } else {
      slice = leaderboard.length
    }

    embed.addField(`You (${message.member.displayName}) are rank ${authRank} (page ${Math.floor(authRank / 10) + 1})`, leaderboard.slice(0, slice));
    message.channel.send(embed);
  }
}