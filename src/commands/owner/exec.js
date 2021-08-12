/**
 * @file This command allows shell commands to be run without ever leaving discord,
 * allowing files to be read, the bot to be restarted, or configs to be changed
 */

const Command = require('../../base/Command');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { Formatters } = require('discord.js');

module.exports = new Command({
  name: 'exec',
  description: 'Runs a shell command on the host machine',
  dirname: __dirname,
  ownerOnly: true,
  usage: '<shell command>',
  async run(client, message, args) {
    if (args[0] == '```') args = args.slice(1, -1);
    const command = args.join(' ');

    try {
      const { stdout: res } = await exec(command);
      message.channel.send(Formatters.codeBlock('bash', `\n${command}\n\n${res.replace(client.token, 'T0K3N')}\n`));
    }
    catch (error) {
      console.log(error);
      message.channel.send('Something went wrong!');
      message.channel.send(Formatters.codeBlock('bash', error));
    }
  },
});
