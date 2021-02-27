const GuildConfig = require('../../database/schemas/GuildConfig')

module.exports = {
  config: {
    name: 'lockdown',
    category: 'moderation',
    description: 'Toggles allowing users to send messages in any channel',
    accessableby: 'Admins',
    permissions: 'ADMINISTRATOR',
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })
    const everyone = message.guild.roles.everyone

    try {
      message.guild.channels.cache.forEach(c => {
        c.updateOverwrite(everyone, { SEND_MESSAGES: guildConfig.lockdown ? null : false })
      })
    } catch (err) {
      console.log(err);
    }

    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { lockdown: !guildConfig.lockdown });
    guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });

    if (guildConfig.lockdown) {
      message.channel.send("**Success!**\nServer in lockdown")
    } else {
      message.channel.send("**Success!**\nServer no longer in lockdown")
    }
  }
}
