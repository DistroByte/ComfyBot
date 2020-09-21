const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    name: 'createpoll',
    aliases: ['poll'],
    usage: '<time> <poll name>',
    category: 'reactions',
    description: 'Creates a yes/no that can only be reacted to once',
    accessableby: 'Moderators'
  },
  run: async (bot, message, args) => {
    message.delete();
    let time = args.shift()
    let title = args.join(' ')
    let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmMhH]$/);
    if (!regex.test(time)) {
      return message.channel.send('Please provide a time limit!')
    }
    if (time.toLowerCase().endsWith('s')) {
      time = parseInt(time.substring(0, time.indexOf('s')))
      time *= 1000
    } else if (time.toLowerCase().endsWith('m')) {
      time = parseInt(time.substring(0, time.indexOf('m')))
      time *= 60 * 1000
    } else if (time.toLowerCase().endsWith('h')) {
      time = parseInt(time.substring(0, time.indexOf('h')))
      time *= 60 * 60 * 1000
    }
    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor('GREEN')
      .setDescription('React with 👍 or 👎')
      .setTimestamp();
    try {
      const polls = new Map();
      const userVotes = new Map();
      let filter = (reaction, user) => {
        if (user.bot) return false;
        if (['👍', '👎'].includes(reaction.emoji.name)) {
          if (polls.get(reaction.message.id).get(user.id)) {
            return false
          } else {
            userVotes.set(user.id, reaction.emoji.name)
            return true // TODO change voting method to most recent reaction
          }
        }
      }
      let msg = await message.channel.send(embed)
      await msg.react('👍');
      await msg.react('👎');
      polls.set(msg.id, userVotes);
      let reactions = await msg.awaitReactions(filter, { time: time });
      let thumbsUp = reactions.get('👍');
      let thumbsUpResults = 0;
      let thumbsDownResults = 0;
      let thumbsDown = reactions.get('👎');
      if (thumbsUp) thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
      if (thumbsDown) thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;

      const resultsEmbed = new MessageEmbed()
        .setTitle('Results')
        .setColor('GREEN')
        .setDescription(`👍 - ${thumbsUpResults} votes\n👎 - ${thumbsDownResults} votes`);

      await msg.edit(resultsEmbed)
    } catch (err) {
      console.log(err);
    }
  }
}