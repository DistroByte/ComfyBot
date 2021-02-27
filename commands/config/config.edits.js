const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'config.edits',
    aliases: ['config.editsdeletes'],
    usage: '<true/false>',
    category: 'config',
    description: 'Enables or disables message edit logging and deleted message logging',
    accessableby: 'Guild Owner',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })

    if (!message.author.id === guildConfig.ownerId || !message.author.id === client.ownerid) return;
    if (!args[0]) return message.channel.send("Please specify if you want to log messages with either `true` or `false`!")

    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { logEditsDeletes: args[0] });
    guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })

    if (guildConfig.logEditsDeletes) {
      message.channel.send("**Success!**\nI will now start to log message edits and deleted messages!")
    } else {
      message.channel.send("**Success!**\nI will no longer log message edits and deleted messages!")
    }
  }
}