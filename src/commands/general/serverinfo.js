/**
 * @file Displays server stats, size and boost count in an embed.
 */

const { MessageEmbed } = require('discord.js');
const Command = require('../../base/Command');

module.exports = new Command({
  name: 'serverinfo',
  description: 'Displays a server\'s information',
  usage: '[ServerID/Name]',
  aliases: ['si'],
  examples: ['serverinfo', 'si', 'serverinfo ComfyBot', 'si 762742746405535774'],
  async run(client, message, args) {
    let guild = message.guild;

    if (args[0]) {
      let found = client.guilds.cache.get(args[0]);
      if (!found) {
        found = client.guilds.cache.find(g => g.name === args.join(' '));
        if (found) guild = found;
      }
    }

    guild = await guild.fetch();

    const serverInfoEmbed = new MessageEmbed()
      .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
      .setThumbnail(guild.iconURL({ dynamic: true, size: 128 }))
      .addField('Created', client.printDate(guild.createdAt), false)
      .addField('Members', `${(await guild.members.fetch({ withPresences: false })).filter(m => !m.user.bot).size} members | ${(await guild.members.fetch({ withPresences: false })).filter(m => m.user.bot).size} bots\n${guild.memberCount} total`, false)
      .addField('AFK Channel', guild.afkChannel || 'Not set', true)
      .addField('ID', guild.id, true)
      .addField('Other', `**Owner:** ${(await guild.fetchOwner()).toString()}\nVerification Level: ${message.guild.verificationLevel}\nServer ID: ${guild.id}`, false)
      .addField('Boosts count', `Total Boosts: ${guild.premiumSubscriptionCount.toString() || 0}\nServer Level: ${guild.premiumTier}`, true)
      .addField('Channels', `${guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size} text | ${guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size} voice\n${guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size} categories | ${guild.channels.cache.size} total`, true)
      .setColor('#0091fc')
      .setFooter('ComfyBot | Developed by DistroByte#0001');

    message.channel.send({ embeds: [serverInfoEmbed] });
  },
});
