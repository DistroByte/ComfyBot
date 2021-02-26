const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'unban',
    description: 'Unban a user from the guild!',
    usage: '<user> (reason)',
    category: 'moderation',
    accessableby: 'Administrators',
    aliases: ['ub', 'unbanish'],
    permissions: 'BAN_MEMBERS',
    args: true
  },
  run: async (client, message, args) => {
    if (isNaN(args[0]))
      return message.channel.send('You need to provide an ID.');
    let bannedMember = await client.users.fetch(args[0]);
    if (!bannedMember)
      return message.channel.send('Please provide a user id to unban someone!');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given!';

    if (!message.guild.me.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR']))
      return (
        message.channel.send("I don't have permission to perform this command!")
      );
    try {
      message.guild.members.unban(bannedMember, reason);
      message.channel.send(
        `${bannedMember.tag} has been unbanned from the guild!`
      );
    } catch (e) {
      console.log(e.message);
    }
  },
};
