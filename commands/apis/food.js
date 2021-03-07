const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'food',
    category: 'apis',
    description: 'Gets random photos of food',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    fetch(`https://foodish-api.herokuapp.com/api`)
      .then(res => res.json())
      .then(res => {
        const embed = new MessageEmbed()
          .setTitle(`Random Meal`)
          .setImage(res.image)
          .setColor('GREEN')
        message.channel.send(embed)
      })
  }
}