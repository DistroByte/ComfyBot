const { ownerid } = require('../../botconfig.json');
const fs = require('fs');

module.exports = {
  config: {
    name: 'unload',
    usage: '<command>',
    category: 'owner',
    description: 'Unloads a command',
    accessableby: 'Owner',
    args: true
  },
  run: async (client, message, args) => {
    if (message.author.id !== ownerid) return message.reply("You can't use that command!")

    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
    }

    const commandFolders = fs.readdirSync('./commands');
    const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

    try {
      delete require.cache[require.resolve(`../${folderName}/${command.config.name}.js`)];
      message.react('✅')
      console.log(`${command.config.name} unloaded: ${new Date().toString().slice(4, 24)}`)
    } catch (error) {
      console.log(error);
      message.channel.send(`Error while unloading command \`${command.config.name}\`:\n\`${error.message}\``);
    } if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`!`);
  }
}