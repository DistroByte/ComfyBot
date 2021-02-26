const { ownerid } = require('../../botconfig.json');
const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = {
  config: {
    name: 'prefix',
    description: 'Shows the current prefix, also allows the prefix to be changed',
    usage: '(change) <new prefix>',
    category: 'info',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    let guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })
    message.channel.send(`Current prefix is \`${guildConfig.prefix}\``)

    if (message.author.id !== ownerid)
      return message.channel.send("You're not the bot the owner!");

    if (args[0] === "update" && args[1]) {
      await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { prefix: args[1] })
      message.channel.send(`Prefix updated to \`${args[1]}\``)
    }
  },
};
