module.exports = {
  config: {
    name: 'lockdown',
    usage: '<start/stop> <duration>',
    category: 'moderation',
    description: 'Mutes the whole server',
    accessableby: 'Moderators'
  },
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)
      return message.channel.send('You dont have permission to use this command.');

    message.guild.members.fetch().then(console.log)

    let muteRole = message.guild.roles.cache.find(r => r.name === 'Lockdown');
    if (!muteRole) {
      muteRole = await message.guild.roles.create({
        data: {
          name: 'Lockdown',
          color: '#514f48',
          permissions: [],
        }
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muteRole,
          {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: true,
            READ_MESSAGE_HISTORY: false,
          }
        );
      });
    }

    if (args[0] === "start") {
      message.guild.members.cache.forEach(async (member, id) => {
        await member.roles.add(muteRole);
      })
      message.channel.send("Lockdown started!");
    }
    if (args[0] === "stop") {
      message.guild.members.cache.forEach(async (member, id) => {
        await member.roles.remove(muteRole);
      })
      message.channel.send("Lockdown over!")
    }

  }
}
