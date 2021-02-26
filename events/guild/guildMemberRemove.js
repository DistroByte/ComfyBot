const { MessageEmbed } = require("discord.js");
const GuildConfig = require('../../database/schemas/GuildConfig')

module.exports = async (client, member) => {
  let guildConfig = await GuildConfig.findOne({ guildId: member.guild.id })

  if (!guildConfig.logLeaves) return
  let logsChannel = member.guild.channels.cache.find(x => x.name === 'logs');
  if (member.guild.me.hasPermission('MANAGE_CHANNELS') && !logsChannel) {
    logsChannel = await member.guild.channels.create('logs', {
      type: 'text',
      permissionOverwrites: [
        {
          id: member.guild.id,
          deny: ['VIEW_CHANNEL'],
        }
      ],
    });
  }

  const embed = new MessageEmbed()
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
  });

  const kickLog = fetchedLogs.entries.first();

  if (!kickLog.action !== 'MEMBER_KICK') {
    embed.setTitle("**User Leave**")
      .setColor("RED")
      .setDescription(`**User Left the guild**\n${member} left the guild`)
  }

  const { executor, target, action } = kickLog;

  if (action === 'MEMBER_KICK') {
    if (target.id === member.id) {
      embed.setTitle("**Kicked User**")
        .setColor("RED")
        .setDescription(`**User was kicked from the guild**\n${member} was kicked by ${executor}`)
        .setFooter(`Member ID: ${member.id}`)
    } else {
      embed.setTitle("**Kicked User**")
        .setColor("RED")
        .setDescription(`**User was kicked from the guild**\n${member} was kicked, but I don't know by who`)
        .setFooter(`${member.id}`)
    }
  }
  logsChannel.send(embed)
}