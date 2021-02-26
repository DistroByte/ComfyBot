const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'config.levelup',
    aliases: ['config.levelupmessage'],
    usage: '<dm/channel/none>',
    category: 'config',
    description: 'Changes how level up messages are noted, by DM, channel, or not at all.',
    accessableby: 'Guild Owner',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })
    let options = ["channel", "dm", "none"]

    if (!message.author.id === guildConfig.ownerId || !message.author.id === client.ownerid) return;
    if (!args[0] || !options.includes(args[0])) return message.channel.send("Please specify if you want send level up messages in either `channel`, `DM` or `none`!")

    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { levelUp: args[1] });
    guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });

    message.channel.send(`**Success!**\nLevel up message notifications are now set to \`${guildConfig.levelUp}\``)
  }
}