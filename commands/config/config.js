const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'config',
    usage: '<editsdeletes/leaves/duplicates> (true/false) || <levelupmessage> (channel/dm/none)',
    category: 'config',
    description: 'Allows the owner to configure the bot\'s server options',
    accessableby: 'Owner',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })

    if (!message.author.id === guildConfig.ownerId || !message.author.id === "180375991133143040") return;

    if (!args[0]) return message.channel.send("Please specify what you would like to change!\nLog edits and deletes - `editsdeletes`\nLog user leaves - `leaves`\nSend level up messages - `levelupmessage`")

    if (args[0] === "editsdeletes") {
      if (!args[1]) return message.channel.send("Please specify if you want to log messages with either `true` or `false`!")
      await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { logEditsDeletes: args[1] });
      guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })
      if (guildConfig.logEditsDeletes) { message.channel.send("**Success!**\nI will now start to log message edits and deleted messages!") }
      else message.channel.send("**Success!**\nI will no longer log message edits and deleted messages!")
    }

    if (args[0] === "levelupmessage") {
      let options = ["channel", "dm", "none"]
      if (!args[1] || !options.includes(args[1])) return message.channel.send("Please specify if you want send level up messages in either `channel`, `DM` or `none`!")
      await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { levelUp: args[1] });
      guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
      message.channel.send(`**Success!**\nLevel up message notifications are now set to \`${guildConfig.levelUp}\``)
    }

    if (args[0] === "leaves") {
      if (!args[1]) return message.channel.send("Please specify if you want to log user leaves with either `true` or `false`!")
      await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { logLeaves: args[1] });
      guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
      if (guildConfig.logEditsDeletes) { message.channel.send("**Success!**\nI will now start to log user leaves!") }
      else message.channel.send("**Success!**\nI will no longer log user leaves!")
    }

    if (args[0] === "duplicates") {
      if (!args[1]) return message.channel.send("Please specify if you want to the bot to send duplicate message with `true` or `false`!")
      await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { sendDuplicates: args[1] });
      guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
      if (guildConfig.logEditsDeletes) { message.channel.send("**Success!**\nI will now start send duplicate messages!") }
      else message.channel.send("**Success!**\nI will no longer send duplicate messages!")
    }
  }
}