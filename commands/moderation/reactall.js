const store = require('storage-to-json');
const react = new store('react');
const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'reactall',
    description: 'Adds an entry to react to messages with an emoji. Good for one line commands',
    usage: '<word to correct for> <reaction to add>',
    category: 'moderation',
    accessableby: 'Moderator',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    if (message.author.id !== client.ownerId)
      return message.channel
        .send("You're not an admin, nice try though :P")

    let first = args[0].toLowerCase();
    let second = message.content.split(' ').splice(2).join(' ');

    if (!react.get(first)) {
      let sEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Created!')
        .setDescription(`I will now react to everyone saying **${first}** with **${second}**`);

      message.channel.send(sEmbed);

      return react.set(first, second);
    }
  },
};
