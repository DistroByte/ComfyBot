const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'bored',
    category: 'apis',
    description: 'Let\'s find you something to do',
    accessableby: 'Members',
  },
  run: async (client, message, args) => {
    fetch(`https://www.boredapi.com/api/activity`)
      .then(res => res.json())
      .then(res => {
        const embed = new MessageEmbed()
          .setTitle(`The Bored API says you should do...`)
          .setDescription(`**${res.activity}**`)
          .addField(`Type`, `${res.type}`)
          .setColor('GREEN')
        message.channel.send(embed)
      })
  }
}