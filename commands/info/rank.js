const { MessageAttachment } = require('discord.js');
const GuildLevels = require('../../database/schemas/GuildLevels');

const { createCanvas, loadImage } = require('canvas');
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

    var sortable = new Map([...memberXp.entries()].sort(function (a, b) {
      return b[1] - a[1];
    }));

    var rank = 1;
    for (var [key, value] of sortable.entries()) {
      if (key !== user.id) {
        rank += 1
      } else {
        break
      }
    }

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

    context.fillStyle = '#23272A'
    context.fillRect(0, 0, width, height)

    context.beginPath();
    context.arc(305, 220, 20, 0.5 * Math.PI, Math.PI * 1.5, false);
    context.arc(910, 220, 20, Math.PI * 1.5, Math.PI * 0.5, false);
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

    context.beginPath();
    context.arc(305, 220, 19, 0.5 * Math.PI, Math.PI * 1.5, false);
    context.arc(305 + Math.floor((currentXP / levelXP) * 605), 220, 19, Math.PI * 1.5, Math.PI * 0.5, false);
    context.closePath();
    context.lineWidth = 3;
    context.fillStyle = "green";
    context.fill();

    context.font = "60px Arial";
    context.fillStyle = "#FEFEFE";
    context.fillText(currentLvl, 928 - context.measureText(currentLvl).width, 108);
    var currentLevelWidth = context.measureText(currentLvl).width

    context.font = "25px Arial";
    context.fillStyle = "#828282";
    context.fillText(`LEVEL`, 928 - currentLevelWidth - context.measureText(`LEVEL `).width, 108);
    currentLevelWidth = currentLevelWidth + context.measureText(`LEVEL `).width

    context.font = "50px Arial";
    context.fillStyle = "#FEFEFE";
    context.fillText(`#${rank}`, 928 - currentLevelWidth - context.measureText(`#${rank}`).width - 5, 108)
    currentLevelWidth = currentLevelWidth + context.measureText(`#${rank}`).width

    context.font = "25px Arial";
    context.fillStyle = "#828282";
    context.fillText(`RANK`, 928 - currentLevelWidth - context.measureText(`LEVEL `).width, 108);

    if (currentXP > 1000) {
      formattedCurrentXP = (currentXP / 1000).toFixed(2) + "K"
    } else {
      formattedCurrentXP = currentXP
    }

    context.font = "25px Arial";
    context.fillStyle = "#FEFEFE";
    context.fillText(`${formattedCurrentXP} `, 720, 190)
    currentXPWidth = context.measureText(`${formattedCurrentXP} `).width;

    if (levelXP > 1000) {
      formattedlevelXP = (levelXP / 1000).toFixed(2) + "K"
    } else {
      formattedlevelXP = levelXP
    }
    context.fillStyle = "#828282";
    context.fillText(`/ ${formattedlevelXP} XP`, 720 + currentXPWidth, 190)

    context.beginPath();
    context.arc(150, 150, 100, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 5;
    context.stroke();
    context.save()
    context.clip();

    const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }));
    context.drawImage(avatar, 50, 50, 200, 200)

    context.restore()

    var buffer = canvas.toBuffer('image/png')

    const attachment = new MessageAttachment(buffer);
    message.channel.send(attachment)
  },
};