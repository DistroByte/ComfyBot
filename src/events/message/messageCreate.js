/**
 * @file Called when the Client receives a new message, it handles parsing arguments,
 * checking permissions and running the command
 */

const Event = require('../../base/Event.js');

module.exports = new Event('messageCreate', async (client, message) => {
  if (message.partial) message = await message.fetch();
  if (message.author.bot) return;
  if (message.guild && !message.member) await message.guild.members.fetch(message.author.id);

  if (!message.content.startsWith(client.prefix)) return;
  const args = message.content.substring(client.prefix.length).trim().split(/\s+/g);

  const commandWord = args.shift().toLowerCase();
  const command = client.commands.get(commandWord) || client.commands.get(client.aliases.get(commandWord));

  if (!command) return;

  if (command.ownerOnly && message.author.id !== client.config.ownerID) return;

  // TODO: add ping response with prefix
  // TODO: add cooldown
  // TODO: add permissions checker

  // command.print();
  command.run(client, message, args);
});
