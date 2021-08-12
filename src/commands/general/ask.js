/**
 * @file The ask Command replies with a simple url to stop people from
 * just saying hello in chat.
 */

const Command = require('../../base/Command');

module.exports = new Command({
  name: 'ask',
  description: 'Don\'t ask to ask, just ask!',
  dirname: __dirname,
  aliases: ['nohello'],
  async run(client, message, args) {
    message.channel.send('https://nohello.net/');
  },
});