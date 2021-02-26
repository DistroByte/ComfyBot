module.exports = {
  config: {
    name: 'mute',
    description: 'Mutes a member in the discord',
    usage: '<user> (reason)',
    category: 'moderation',
    accessableby: 'Members',
    aliases: ['m', 'nospeak'],
    permissions: 'MANAGE_ROLES',
    args: true
  },
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR']))
      return message.channel.send("I don't have permission to add roles!");

    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given';

    let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
    if (!muteRole) {
      try {
        muterole = await message.guild.roles.create({
          data: {
            name: 'Muted',
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
              SPEAK: false,
            }
          );
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    mutee.roles.add(muteRole.id).then(() => {
      mutee.send(`You have been muted in ${message.guild.name} for: ${reason}`)
        .catch((err) => console.log(err));
      message.channel.send(`${mutee.user.username} was successfully muted.`);
    });
  },
};
