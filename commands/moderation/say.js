module.exports = {
  config: {
    name: 'say',
    description: 'Sends a message that was inputted to a channel',
    usage: '<message>',
    category: 'moderation',
    accessableby: 'Moderators',
    aliases: ['acc', 'announcement'],
    permissions: 'MANAGE_MESSAGES',
    args: true
  },
  run: async (client, message, args) => {
    let argsresult;
    let mentionedChannel = message.mentions.channels.first();

    message.delete();
    if (mentionedChannel) {
      argsresult = args.slice(1).join(' ');
      mentionedChannel.send(argsresult);
    } else {
      argsresult = args.join(' ');
      message.channel.send(argsresult);
    }
  },
};
