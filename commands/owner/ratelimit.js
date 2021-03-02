module.exports = {
  config: {
    name: 'ratelimit',
    description: 'Dumps a load of messages to a channel to ratelimit the bot',
    category: 'owner',
    accessableby: 'owner',
    aliases: ['botstop', 'restart'],
    permissions: 'ADMINISTRATOR',
    hidden: true
  },
  run: async (client, message, args) => {
    if (message.author.id !== client.ownerId)
      return message.channel.send("You're not the bot owner!");

    const chan = client.channels.cache.get('769404248378048512')
    for (let i = 0; i < 20; i++) {
      chan.send(`Ratelimiting myself for ${20 - i} more messages!`)
    }
  },
};
