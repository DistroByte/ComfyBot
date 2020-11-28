const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'softban',
		description: 'Bans a user from the guild for 1 day',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['sb', 'sbanish', 'sremove'],
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR']))
			return message.channel.send(
				"You don't have permission to perform this command!"
			);

		let banMember =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);
		if (!banMember)
			return message.channel.send('Please provide a user to soft ban!');

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason given!';

		if (!message.guild.me.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR']))
			return message.channel.send(
				"I don't have permission to perform this command"
			);

		banMember.send(`You have been banned from ${message.guild.name} for: ${reason} for 1 day`)
			.then(() =>
				message.guild.members.ban(banMember, { days: 1, reason: reason })
			).then(() => message.guild.unban(banMember.id, { reason: 'Softban' }))
			.catch((err) => console.log(err));

		message.channel.send(`**${banMember.user.tag}** has been banned`)
			.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));
	},
};
