const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'insult',
    category: 'apis',
    description: 'Get an insult',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    fetch(`https://evilinsult.com/generate_insult.php?lang=en&type=json`)
      .then(res => res.json())
      .then(res => {
        message.channel.send(`${message.author} ${res.insult.toString()}`)
      })
  }
}