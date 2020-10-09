const { ownerid } = require('../../botconfig.json')

module.exports = {
  config: {
    name: 'reload',
    aliases: ['r'],
    usage: '<command>',
    category: 'Owner',
    description: 'Reloads a command for testing',
    accessableby: 'Owner'
  },
  run: async (client, message, args) => {
    if (message.author.id !== ownerid) return message.reply('You can\'t use this command!').then(m => m.delete({ timeout: 5000 }));

    if (!args || args.length < 1) return message.reply("You must provide a command name to reload.");
    const commandName = args[0];
    if (!client.commands.has(commandName)) {
      return message.reply("That command does not exist");
    }
    try {
      delete require.cache[require.resolve(`./home/pi/ComfyBot/commands/${commandName}.js`)];
    } catch (e) {
      return console.log(e);
    }
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded`);
  }
}