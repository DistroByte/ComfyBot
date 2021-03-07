const { ownerid } = require('../../botconfig.json');

module.exports = {
  config: {
    name: 'load',
    usage: '<path/to/command>',
    category: 'owner',
    description: 'Loads a new command',
    accessableby: 'Owner',
    args: true
  },
  run: async (client, message, args) => {
    if (message.author.id !== ownerid) return message.reply("You can't use that command!")

    const commandArgs = args[0].toLowerCase().split("/");

    try {
      const newCommand = require(`../${commandArgs[0]}/${commandArgs[1]}.js`);
      client.commands.set(newCommand.config.name, newCommand);
      if (newCommand.config.aliases) {
        newCommand.config.aliases.forEach((a) => client.aliases.set(a, newCommand.config.name));
      }
      message.react('✅')
      console.log(`${newCommand.config.name} loaded: ${new Date().toString().slice(4, 24)}`)
    } catch (error) {
      console.log(error);
      message.channel.send(`Error while loading command \`${commandArgs[1]}\`:\n\`${error.message}\``);
    }
  }
}