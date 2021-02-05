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

    user = message.author

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

    const currentLvl = getLevel(xp)
    const currentXP = xp - getCommunitiveXp(currentLvl);
    const levelXP = getLevelXp(currentLvl)

    message.channel.send(`Your current level: ${currentLvl}\nCurrent XP: ${currentXP}/${levelXP} XP`)

    context.fillStyle = '#23272A'
    context.fillRect(0, 0, width, height)

    context.beginPath();
    context.arc(305, 220, 20, 0.5 * Math.PI, Math.PI * 1.5, false);
    context.arc(910, 220, 20, Math.PI * 1.5, Math.PI * 0.5, false);
    context.closePath();
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.arc(150, 150, 100, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 3;
    context.stroke();

    context.font = "50px Arial";
    context.fillStyle = "#FEFEFE";
    context.fillText(`${user.username}`, 305, 190);
    usernameWidth = context.measureText(`${user.username}`).width

    context.font = "25px Arial";
    context.fillStyle = "#828282";
    context.fillText(`#${user.discriminator}`, 305 + usernameWidth, 190)

    const percentFilled = Math.floor((currentXP / levelXP) * 605)
    console.log(percentFilled);

    context.beginPath();
    context.arc(305, 220, 19, 0.5 * Math.PI, Math.PI * 1.5, false);
    context.arc(305 + percentFilled, 220, 19, Math.PI * 1.5, Math.PI * 0.5, false);
    context.closePath();
    context.lineWidth = 3;
    context.fillStyle = "green";
    context.fill();

    const buffer = canvas.toBuffer('image/png')

    const attachment = new MessageAttachment(buffer);
    message.channel.send(attachment)
  },
};