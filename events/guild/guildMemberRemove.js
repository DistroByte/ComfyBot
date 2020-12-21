const { MessageEmbed } = require("discord.js");

module.exports = async (bot, member) => {
  let logsChannel = oldMessage.guild.channels.cache.find(x => x.name === 'logs');
  if (oldMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logsChannel) {
    logsChannel = await oldMessage.guild.channels.create('logs', {
      type: 'text',
      permissionOverwrites: [
        {
          id: oldMessage.guild.id,
          deny: ['VIEW_CHANNEL'],
        }
      ],
    });
  }

  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
  });

  const embed = new MessageEmbed()

  const kickLog = fetchedLogs.entries.first();
  if (!kickLog) {
    return embed.setTitle("**User Leave**")
      .setColor("RED")
      .addField("User Left the guild", `${member.user.tag} left the guild`, true)
  }
  const { executor, target } = kickLog;
  if (target.id === member.id) {
    embed.setTitle("**Kicked User**")
      .setColor("RED")
      .addField("User was kicked from the guild", `${member.user.tag} was kicked by ${executor.tag}`, true);
  } else {
    embed.setTitle("**Kicked User**")
      .setColor("RED")
      .addField("User was kicked from the guild", `${member.user.tag} was kicked, but I don't know by who`, true);
  }

  logsChannel.send(embed)
}