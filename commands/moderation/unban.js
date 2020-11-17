const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'unban',
		description: 'Unban a user from the guild!',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['ub', 'unbanish'],
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR']))
			return message.channel.send(
				'You dont have permission to perform this command!'
			);

		if (isNaN(args[0]))
			return message.channel.send('You need to provide an ID.');
		let bannedMember = await bot.users.fetch(args[0]);
		if (!bannedMember)
			return message.channel.send('Please provide a user id to unban someone!');

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason given!';

		if (!message.guild.me.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR']))
			return (
				message.channel.send(
					"I don't have permission to perform this command!"
				) | message.delete({ timeout: 5000, reason: 'tidying up' })
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
