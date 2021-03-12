const { MessageAttachment } = require('discord.js');
const GuildLevels = require('../../database/schemas/GuildLevels');

const { createCanvas, loadImage } = require('canvas');
const { getLevel, getLevelXp, getCommunitiveXp } = require('../../utils/functions');
const width = 1000
const height = 300
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

module.exports = {
  config: {
    name: 'rank',
    description: 'Gets your current XP, level and rank and displays in a nice image',
    category: 'ranking',
    accessableby: 'Members',
    aliases: ['level', 'lvl', 'exp', 'xp', 'level']
  },
  run: async (client, message, args) => {
    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let user;

    if (!message.mentions.members.first()) {
      user = message.author
    } else {
      user = message.mentions.members.first().user
    }

    if (user.bot) return message.channel.send("Bots can't have xp, silly!")


    let memberXp = guildLevels.memberXp
    let xp = memberXp.get(user.id)

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

    var currentLvl = getLevel(xp) || 0
    var currentXP = xp - getCommunitiveXp(currentLvl) || 0
    var levelXP = getLevelXp(currentLvl) || 0

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

    if (xp != 0) {
      context.beginPath();
      context.arc(305, 220, 19, 0.5 * Math.PI, Math.PI * 1.5, false);
      context.arc(305 + Math.floor((currentXP / levelXP) * 605), 220, 19, Math.PI * 1.5, Math.PI * 0.5, false);
      context.closePath();
      context.lineWidth = 3;
      context.fillStyle = "green";
      context.fill();
    }

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