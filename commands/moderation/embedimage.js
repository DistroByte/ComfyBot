const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'embedimage',
    aliases: ['imageembed'],
    usage: '<url>',
    category: 'moderation',
    description: 'Embeds an image in an embed',
    accessableby: 'Moderators'
  },
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR']))
      return message.channel.send("You can't use this command!");

    message.delete();

    if (!args[0]) return message.channel.send("Please include a URL to embed!").then(m => m.delete({ timeout: 5000 }))

    const embed = new MessageEmbed().setImage(args[0])

    message.channel.send(embed)
  }
}