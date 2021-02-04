const { MessageAttachment } = require('discord.js');
const GuildLevels = require('../../database/schemas/GuildLevels');
const fs = require('fs');

const { createCanvas } = require('canvas')
const width = 1000
const height = 300
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

module.exports = {
  config: {
    name: 'rank',
    description: 'Returns the number of messages since bot started counting per user',
    category: 'basic',
    accessableby: 'Members',
    aliases: ['level', 'lvl', 'msg', 'exp']
  },
  run: async (bot, message, args) => {
    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    user = message.author.username

    let memberXp = guildLevels.memberXp
    let xp = memberXp.get(message.author.id)
    function getLevel(xp) {
      return level = Math.floor((((3888 * xp ** 2 + 291600 * xp - 207025) ** (0.5) / (40 * 3 ** (3 / 2)) + ((3 * (3 * xp)) / 5 + 2457 / 4) / 6 - 729 / 8) ** (1 / 3) + 61 / (12 * ((3888 * xp ** 2 + 291600 * xp - 207025) ** (0.5) / (40 * 3 ** (3 / 2)) + ((3 * (3 * xp)) / 5 + 2457 / 4) / 6 - 729 / 8) ** (1 / 3)) - 9 / 2))
    }
    function getCommunitiveXp(lvl) {
      return communitive = Math.floor(((5 * lvl * lvl * lvl) / 3) + ((45 * lvl * lvl) / 2) + ((455 * lvl) / 6))
    }
    function getLevelXp(lvl) {
      return levelXp = 5 * Math.floor(lvl / 1) ** 2 + 50 * Math.floor(lvl / 1) + 100
    }

    message.channel.send(`Your current level: ${getLevel(xp)}\nCurrent XP: ${xp - getCommunitiveXp(getLevel(xp))}/${getLevelXp(getLevel(xp))} XP`)

    context.fillStyle = '#303030'
    context.fillRect(0, 0, width, height)

    context.beginPath();
    context.arc(305, 220, 20, 0.5 * Math.PI, Math.PI * 1.5, false);
    context.arc(910, 220, 20, Math.PI * 1.5, Math.PI * 0.5, false);
    context.closePath();
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.arc(156, 156, 100, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 3;
    context.stroke();

    context.font = "50px Arial"
    context.fillStyle = "white"
    context.fillText(`${user}`, 305, 190)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('storage/card.png', buffer)

    const attachment = new MessageAttachment('storage/card.png');
    message.channel.send(attachment)
  },
};