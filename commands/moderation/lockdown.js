module.exports = {
  config: {
    name: 'lockdown',
    aliases: [],
    usage: '<start/stop> <duration>',
    category: 'moderation',
    description: 'Mutes the whole server',
    accessableby: 'Moderators'
  },
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)
      return message.channel.send('You dont have permission to use this command.');

    let muteRole = message.guild.roles.cache.find(r => r.name === 'Lockdown');
    if (!muteRole) {
      muteRole = await message.guild.roles.create({
        date: {
          name: 'Lockdown',
          color: '#514f48',
          permissions: [],
        }
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole,
          {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false,
            MESSAGE_HIST
          }
        );
      });
    }

    if (args[0] === "start") {
      message.guild.members.cache.forEach(async (member, id) => {
        member.roles.add(muteRole);
      }).then(() => {
        message.channel.send("Lockdown started!");
      });
    }
    if (args[0] === "stop") {
      message.guild.members.cache.forEach(async (member, id) => {
        member.roles.remove(muteRole);
      }).then(() => {
        message.channel.send("Lockdown over!")
      });
    }

  }
}
