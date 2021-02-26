const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');

module.exports = {
  config: {
    name: 'membercount',
    description: 'Pulls the member count of the guild!',
    category: 'info',
    aliases: ['members'],
  },
  run: async (client, message, args) => {
    let sEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField('**Member Count:**', `${message.guild.memberCount}`, true)
      .setFooter(
        `ComfyBot | Developed by ${client.users.cache.get(ownerid).tag}`,
        client.user.displayAvatarURL()
      );
    message.channel.send(sEmbed);
  },
};
