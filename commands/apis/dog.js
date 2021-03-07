const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'dog',
    category: 'apis',
    description: 'Fetches a random dog image',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    fetch('https://random.dog/woof.json')
      .then(res => res.json())
      .then(res => {
        const embed = new MessageEmbed()
          .setTitle('Random Dog')
          .setImage(res.url)
          .setColor('GREEN')
        message.channel.send(embed)
      })
  }
}