const storage = require('storage-to-json');
const correct = new storage('correct');
const reactStore = new storage('react');
const caSend = new storage('computerAppsCorrect');
const GuildConfig = require('../../database/schemas/GuildConfig');
const GuildLevels = require('../../database/schemas/GuildLevels');
const { getLevel, sendDuplicates } = require('../../utils/functions');

module.exports = async (client, message) => {
  let guildConfig
  try {
    guildConfig = await GuildConfig.findOne({
      guildId: message.guild.id
    }).exec();
  } catch (err) {
  }

  let prefix = guildConfig ? guildConfig.prefix : "!"
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    try {
      let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      if (commandFile) {
        if (commandFile.config.permissions) {
          if (message.author.id !== client.ownerId) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(commandFile.config.permissions)) {
              return message.reply('you don\'t have the correct permissions!');
            }
          }
        }

        if (commandFile.config.args && !args.length) {
          let reply = `Please provide some arguments, ${message.author}!`
          if (commandFile.config.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${commandFile.config.name} ${commandFile.config.usage}\``;
          }
          return message.channel.send(reply);
        }

        console.log(`${commandFile.config.name} used: ${new Date().toString().slice(4, 24)}`);
        return commandFile.run(client, message, args);
      }
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

    let react = reactStore.get_storage();
    if (!message.content.includes('react')) {
      for (var key in react) {
        var value = react[key];
        if (message.content.toLowerCase().includes(key)) {
          message.react(value);
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

    if (guildConfig.sendDuplicates) sendDuplicates(message)
    if (client.talkedRecently.has(message.author.id)) return;

    let guildLevels = await GuildLevels.findOne({ guildId: message.guild.id })
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

    client.talkedRecently.add(message.author.id);
    setTimeout(() => {
      client.talkedRecently.delete(message.author.id);
    }, 30000);
  }
};
