const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'embedimage',
    aliases: ['imageembed'],
    usage: '<url>',
    category: 'moderation',
    description: 'Embeds an image in an embed',
    accessableby: 'Moderators',
    permissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
    args: true
  },
  run: async (client, message, args) => {
    message.delete();

    const embed = new MessageEmbed().setImage(args[0])

    message.channel.send(embed)
  }
}