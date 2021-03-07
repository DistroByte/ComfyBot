const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'cat',
    category: 'apis',
    description: 'Fetches a random cat image',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    fetch('https://aws.random.cat/meow')
      .then(res => res.json())
      .then(res => {
        const embed = new MessageEmbed()
          .setTitle('Random Cat')
          .setImage(res.file)
          .setColor('GREEN')
        message.channel.send(embed)
      })
  }
}