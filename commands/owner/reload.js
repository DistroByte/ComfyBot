const { ownerid } = require('../../botconfig.json');
const reload = require('../../handlers/command');

module.exports = {
  config: {
    name: 'reload',
    aliases: ['r'],
    usage: '<command>',
    category: 'owner',
    description: 'Reloads commands for testing',
    accessableby: 'Owner'
  },
  run: async (client, message, args) => {
    if (message.author.id !== ownerid) return message.reply('You can\'t use this command!').then(m => m.delete({ timeout: 5000 }));

    message.channel.send("FIX ME 🔪");
  }
}