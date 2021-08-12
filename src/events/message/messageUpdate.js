/**
 * @file The messageUpdate event is called when a message is edited,
 * the Client creates a new message with the edited message content
 * and uses the edited message as if it was a messageCreate
 */

const Event = require('../../base/Event.js');

module.exports = new Event('messageUpdate', async (client, oldMessage, newMessage) => {
  if (!newMessage.editedAt) return;
  client.emit('messageCreate', newMessage);
});
