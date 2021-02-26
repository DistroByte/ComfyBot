const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'unmute',
    description: 'Unmutes a member in the discord!',
    usage: '<user> (reason)',
    category: 'moderation',
    accessableby: 'Moderators',
    aliases: ['unm', 'speak'],
    permissions: 'MANAGE_ROLES',
    args: true
  },
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR']))
      return message.channel.send("I don't have permission to add roles!");

    //define the reason and unmutee
    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mutee) return message.channel.send('Please supply a user to be unmuted!');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given';

    //define mute role and if the mute role doesnt exist then send a message
    let muterole = message.guild.roles.cache.find((r) => r.name === 'Muted');
    if (!muterole) return message.channel.send('There is no mute role to remove!');

    //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
    mutee.roles.remove(muterole.id).then(() => {
      mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`)
        .catch((err) => console.log(err));
      message.channel.send(`${mutee.user.username} was unmuted!`);
    });
  },
};
