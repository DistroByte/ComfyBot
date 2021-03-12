module.exports = async (client, message, queue) => {
  message.channel.send(`${client.emotes.error} - Music stopped as I have been disconnected from the channel!`);
};