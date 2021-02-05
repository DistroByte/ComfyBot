const storage = require('storage-to-json');
const correct = new storage('correct');
const replace = new storage('replace');
const caSend = new storage('computerAppsCorrect');
const GuildConfig = require('../../database/schemas/GuildConfig');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = async (bot, message) => {
  let guildConfig = await GuildConfig.findOne({
    guildId: message.guild.id
  }).exec();

  let prefix;
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
    if (bot.talkedRecently.has(message.author.id)) return;

    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let memberXp = guildLevels.memberXp
    if (!memberXp.get(message.author.id)) {
      memberXp.set(`${message.author.id}`, "15");
    } else {
      let xp = Number(Math.floor((Math.random() * 15) + 15)) + Number(memberXp.get(message.author.id))
      memberXp.set(`${message.author.id}`, `${xp}`)
    }
    guildLevels.save()

    bot.talkedRecently.add(message.author.id);
    setTimeout(() => {
      bot.talkedRecently.delete(message.author.id);
    }, 60000);
  }

  let correctme = correct.get_storage();
  if (!message.content.includes('correct')) {
    for (var key in correctme) {
      var value = correctme[key];
      if (message.content.toLowerCase().includes(key)) {
        message.channel.send(value);
      }
    }
  }

  let replaceme = replace.get_storage();
  for (var key in replaceme) {
    var value = replaceme[key];
    if (message.channel.id === key && message.content.includes(value)) {
      message.delete()
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
};
