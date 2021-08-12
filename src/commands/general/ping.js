/**
 * @file The ping Command displays the current API latency and also
 * the current edit latency, or message processing latency of the bot
 */

const Command = require('../../base/Command');

module.exports = new Command({
  name: 'ping',
  description: 'Shows the latency of the bot',
  aliases: ['pong', 'latency'],
  dirname: __dirname,
  cooldown: 3000,

  async run(client, message, args) {
    const msg = await message.reply('Pinging...');

    msg.edit(`Pong! My ping is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API Latency: \`${Math.round(client.ws.ping)}ms\``);
  },
});
