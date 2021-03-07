const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: 'space',
    category: 'apis',
    description: 'Gets the current astronauts in space',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    var url = "http://api.open-notify.org/astros.json";

    const embed = new MessageEmbed()
      .setTitle("**List of people currently in space**")

    fetch(url)
      .then(res => res.json())
      .then(res => {
        embed
          .setDescription(`Total number of people in space: **${res.number}**`)

        let data = []
        res.people.forEach(m => {
          data.push(`${m.craft} - ${m.name}`)
        })
        embed
          .addField(`Name`, data)
        message.channel.send(embed)
      })

  }
}