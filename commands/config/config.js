const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'config',
    usage: '',
    category: 'config',
    description: 'Allows the owner to configure the bot\'s server options',
    accessableby: 'Guild Owner',
    permissions: 'ADMINISTRATOR',
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })

    if (!message.author.id === guildConfig.ownerId || !message.author.id === "180375991133143040") return;

    message.channel.send(`**Available config options**\n\`config.edits\` - Logs message edits and deletes - true/false\n\`config.leaves\` - Logs user leaves - true/false\n\`config.duplicates\` - Sends duplicate "train" messages - true/false\n\`config.levelup\` - Changes how level up messages are sent - channel/dm/none`)
  }
}