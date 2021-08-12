/**
 * @file This command returns a simple embed with the Guild member count displayed.
 */

const { MessageEmbed } = require('discord.js');
const Command = require('../../base/Command');

module.exports = new Command({
  name: 'membercount',
  description: 'Displays the current member count of the guild',
  aliases: ['members', 'totalmembers'],
  guildOnly: true,
  async run(client, message, args) {
    const memberCountEmbed = new MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL({ dynamic: true }))
      .addField('**Member Count:**', `${message.guild.memberCount}`, true)
      .setColor('#0091fc')
      .setFooter('ComfyBot | Developed by DistroByte#0001');

    message.channel.send({ embeds: [memberCountEmbed] });
  },
});