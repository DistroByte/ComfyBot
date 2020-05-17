const { MessageCollector } = require('discord.js')
const Store = require('storage-to-json');
let emojiStore = new Store('roleReactions')

module.exports = {
  config: {
    name: 'createPoll',
    aliases: ['poll'],
    usage: '<time> <poll name>',
    category: 'reactions',
    description: 'Creates a yes/no that can only be reacted to once',
    accessableby: 'Moderators'
  },
  run: async (bot, message, args) => {
    let timeLimit = args.shift().toLowerCase()
    let title = args
    if (!timeLimit) return message.channel.send('PLease provide a time limit').then(m => m.delete({ timeout: 5000 }))
    if (!title) return message.channel.send('PLease provide a title for this poll').then(m => m.delete({ timeout: 5000 }))

    let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmMhH]$/);
    if (!regex.test(time)) {

    }
  }
}