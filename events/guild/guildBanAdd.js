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

  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD',
  });

  const banLog = fetchedLogs.entries.first();
  if (!banLog) {
    return embed.setTitle("**Banned User**")
      .setColor("RED")
      .addField("User was banned from the guild the guild", `${member.user.tag} was banned from the guild`, true)
  }
  const { executor, target } = banLog;
  if (target.id === user.id) {
    embed.setTitle("**Banned User**")
      .setColor("RED")
      .addField("User was banned from the guild", `${member.user.tag} was bannned by ${executor.tag}`, true);
  } else {
    embed.setTitle("**Banned User**")
      .setColor("RED")
      .addField("User was banned from the guild", `${member.user.tag} was banned, but I don't know by who`, true);
  }

  logsChannel.send(embed)
}