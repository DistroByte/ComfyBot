const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'config.duplicates',
    aliases: [],
    usage: '<true/false>',
    category: 'config',
    description: 'Enables or disables duplicate message chaining',
    accessableby: 'Guild Owner',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })

    if (!message.author.id === guildConfig.ownerId || !message.author.id === client.ownerid) return;
    if (!args[0]) return message.channel.send("Please specify if you want to the bot to send duplicate message with `true` or `false`!")

    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { sendDuplicates: args[0] });
    guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });

    if (guildConfig.sendDuplicates) {
      message.channel.send("**Success!**\nI will now start send duplicate messages!")
    } else {
      message.channel.send("**Success!**\nI will no longer send duplicate messages!")
    }
  }
}