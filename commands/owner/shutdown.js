const { ownerid, dev1 } = require('../../botconfig.json');

module.exports = {
  config: {
    name: 'shutdown',
    description: 'Shuts down the bot!',
    category: 'owner',
    accessableby: 'owner',
    aliases: ['botstop', 'restart'],
  },
  run: async (client, message, args) => {
    if (message.author.id !== ownerid)
      return message.channel.send("You're not the bot the owner!");

    try {
      await message.react('👋');
      process.exit();
    } catch (e) {
      message.channel.send(`ERROR: ${e.message}`);
    }
  },
};
