const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'agepredict',
    aliases: ['predictage'],
    usage: '<name>',
    category: 'apis',
    description: 'Guesses the age of a name',
    accessableby: 'Members',
    args: true
  },
  run: async (client, message, args) => {
    fetch(`https://api.agify.io?name=${args[0]}`)
      .then(res => res.json())
      .then(res => {
        const embed = new MessageEmbed()
          .setTitle(`${res.name} is about **${res.age}** years old`)
          .setColor('GREEN')
        message.channel.send(embed)
      })
  }
}