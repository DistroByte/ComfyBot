const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'sayembed',
    description: 'Sends a message that was inputted to a channel as an embed',
    usage: '<message>',
    category: 'moderation',
    accessableby: 'Moderators',
    aliases: ['acce', 'announcemente', 'saye'],
    permissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
    args: true
  },
  run: async (client, message, args) => {
    let argsresult;
    let mChannel = message.mentions.channels.first();

    message.delete();

    if (mChannel) {
      argsresult = args.slice(1).join(' ');
      const embed = new MessageEmbed()
        .setDescription(argsresult)
        .setColor('GREEN');
      mChannel.send(embed);
    } else {
      argsresult = args.join(' ');
      const embed = new MessageEmbed()
        .setDescription(argsresult)
        .setColor('GREEN');
      message.channel.send(embed);
    }
  },
};
