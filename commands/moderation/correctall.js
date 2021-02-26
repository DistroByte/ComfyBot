const store = require('storage-to-json');
const correct = new store('correct');
const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');

module.exports = {
  config: {
    name: 'correctall',
    description: 'Adds an entry to correct messages with something else. Good for one line commands',
    usage: '<word to correct for> <word to correct with>',
    category: 'moderation',
    accessableby: 'Moderator',
    permissions: 'ADMINISTRATOR',
    args: true
  },
  run: async (client, message, args) => {
    if (message.author.id !== ownerid)
      return message.channel
        .send("You're not an admin, nice try though :P")

    let first = args[0].toLowerCase();
    let second = message.content.split(' ').splice(2).join(' ');

    if (!correct.get(first)) {
      let sEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Created!')
        .setDescription(`I will now correct everyone saying **${first}** with **${second}**`);

      message.channel.send(sEmbed);

      return correct.set(first, second);
    }
  },
};
