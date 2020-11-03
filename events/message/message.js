const storage = require('storage-to-json');
const correct = new storage('correct');
const GuildConfig = require('../../database/schemas/GuildConfig');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = async (bot, message) => {
  let guildConfig;

  // if (message.channel.type != 'dm') {
  //   const count = new storage(`${message.guild.id}`);
  //   if (!count) return
  //   if (!count.get(`${message.author.id}`)) {
  //     let messageCount = 1;
  //     count.set(`${message.author.id}`, messageCount);
  //   } else {
  //     let messageCount = count.get(`${message.author.id}`);
  //     messageCount++;
  //     count.set(`${message.author.id}`, messageCount);
  //   }
  // }

  if (message.channel.type !== "dm") {
    guildConfig = await GuildConfig.findOne({
      guildId: message.guild.id
    }).exec();

    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let memberXp = guildLevels.memberXp
    if (!memberXp.get(message.author.id)) {
      memberXp.set(`${message.author.id}`, "0");
    } else {
      let xp = Number(Math.floor((Math.random() * 15) + 15)) + Number(memberXp.get(message.author.id))
      memberXp.set(`${message.author.id}`, `${xp}`)
    }
    guildLevels.save()
  }

  let prefix;
  if (!guildConfig) {
    prefix = "!"
  } else {
    prefix = guildConfig.prefix
  }
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let correctme = correct.get_storage();
  if (!message.author.bot) {
    if (!message.content.includes('correct')) {
      for (var key in correctme) {
        var value = correctme[key];
        if (message.content.toLowerCase().includes(key)) {
          message.channel.send(value);
        }
      }
    }
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  try {
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (commandfile) commandfile.run(bot, message, args);
  } catch (e) {
    console.log(e);
  }
};
