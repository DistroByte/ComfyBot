const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'invite',
    aliases: ['invitelink'],
    usage: '',
    category: 'info',
    description: 'Invites the bot to your server!',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setDescription('[Invite ComfyBot to your server!](https://discord.com/api/oauth2/authorize?client_id=666393146351026176&permissions=8&scope=bot)\n[Join the official ComfyBot Help Server!](https://discord.gg/P5qRX8h)')
      .setColor('GREEN');
    message.channel.send(embed)
  }
}