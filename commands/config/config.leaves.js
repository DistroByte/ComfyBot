const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'config.leaves',
    aliases: [],
    usage: '<true/false>',
    category: 'config',
    description: 'Enables or disables logging of user leaves and user kicks',
    accessableby: 'Guild Owner',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })

    if (!message.author.id === guildConfig.ownerId || !message.author.id === client.ownerid) return;
    if (!args[0]) return message.channel.send("Please specify if you want to log user leaves with either `true` or `false`!")

    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { logLeaves: args[0] });
    guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });

    if (guildConfig.logLeaves) {
      message.channel.send("**Success!**\nI will now start to log user leaves!")
    } else {
      message.channel.send("**Success!**\nI will no longer log user leaves!")
    }
  }
}