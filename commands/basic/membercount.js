const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'membercount',
    description: 'Pulls the serverinfo of the guild!',
    usage: '',
    category: 'basic',
    aliases: ['members'],
  },
  run: async (bot, message, args) => {
    let sEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField('**Member Count:**', `${message.guild.memberCount}`, true)
      .setFooter(
        `ComfyBot | Developed by DistroByte`,
        bot.user.displayAvatarURL()
      );
    message.channel.send(sEmbed);
  },
};
