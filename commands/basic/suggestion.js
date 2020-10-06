const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'suggest',
    aliases: ['suggestion', 'idea'],
    usage: '<your suggestion>',
    category: 'basic',
    description: 'Adds an embed with your idea! Moderators can type !suggestion approve/decline <message ID>',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    message.delete();

    if (args[0] === 'approve') {
      let fetched = await message.channel.messages.fetch(args[1]);
      console.log(fetched.embeds[0].MessageEmbed.description)
      let reason = args.slice(2).join(' ');
      let approved = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Suggestion approved!')
        .setDescription(fetched.content)
        .addField(`Reason by ${message.author.tag}`, reason)
      return message.channel.send(approved)
    }


    let suggestion = args.join(' ');
    let embed = new MessageEmbed()
      .setColor('BLUE')
      .setDescription(suggestion)
      .setTitle(`New suggestion!`);

    message.channel.send(embed).then(async m => {
      await m.react('👍');
      await m.react('👎');
    });




  }
}