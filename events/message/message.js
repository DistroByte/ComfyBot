const storage = require('storage-to-json');
const correct = new storage('correct');
const caSend = new storage('computerAppsCorrect');
const GuildConfig = require('../../database/schemas/GuildConfig');
const GuildLevels = require('../../database/schemas/GuildLevels');
const { getLevel } = require('../../utils/functions');

module.exports = async (bot, message) => {
  let guildConfig
  let prefix;
  try {
    guildConfig = await GuildConfig.findOne({
      guildId: message.guild.id
    }).exec();
  } catch (err) {
  }

  if (!guildConfig) {
    prefix = "!"
  } else {
    prefix = guildConfig.prefix
  }

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    try {
      let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
      if (commandfile) return commandfile.run(bot, message, args);
    } catch (e) {
      console.log(e);
    }
  }

  if (message.channel.type !== "dm") {
    let correctme = correct.get_storage();
    if (!message.content.includes('correct')) {
      for (var key in correctme) {
        var value = correctme[key];
        if (message.content.toLowerCase().includes(key)) {
          message.channel.send(value);
        }
      }
    }

    let cacorrect = caSend.get_storage();
    if (message.guild.id === "759921793422458901") {
      for (var key in cacorrect) {
        var value = cacorrect[key];
        if (message.content.toLowerCase().includes(key)) {
          message.channel.send(value);
        }
      }
    }

    if (message.guild.id !== "713522800081764392") {
      message.channel.messages.fetch({ limit: 3 }).then(messages => {
        let values = messages.values()
        let secondLastMessage = values.next().value
        let lastMessage = values.next().value
        if (lastMessage.content === secondLastMessage.content) {
          message.channel.send(message.content)
        }
      })
    }

    if (bot.talkedRecently.has(message.author.id)) return;

    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let xpToAdd = Number(Math.floor((Math.random() * 15) + 15))
    let membersXp = guildLevels.memberXp

    if (!membersXp.get(message.author.id)) {
      membersXp.set(`${message.author.id}`, xpToAdd);
    } else {
      let memberXp = Number(membersXp.get(message.author.id))
      let newXp = xpToAdd + memberXp

      let checkLevelUp = function (oldXp, toAdd) {
        let oldLevel = getLevel(oldXp)
        let newLevel = getLevel(oldXp + toAdd)
        if (newLevel > oldLevel) {
          return true;
        } else {
          return false;
        };
      }

      if (guildConfig.levelUp === "channel") {
        if (checkLevelUp(memberXp, xpToAdd)) message.channel.send(`**${message.author.username}** has just reached level **${getLevel(newXp)}!**`)
      } else if (guildConfig.levelUp === "dm") {
        if (checkLevelUp(memberXp, xpToAdd)) message.author.send(`You have just reached level **${getLevel(newXp)}!** in ${message.guild.name}`)
      }
      membersXp.set(`${message.author.id}`, `${newXp}`)
    }
    guildLevels.save()

    bot.talkedRecently.add(message.author.id);
    setTimeout(() => {
      bot.talkedRecently.delete(message.author.id);
    }, 30000);
  }
};
