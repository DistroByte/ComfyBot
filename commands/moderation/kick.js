const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'kick',
		description: 'Kicks a user from the guild',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Moderator',
		aliases: ['k'],
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR']))
			return message.channel.send(
				'You dont have permission to perform this command!'
			);

		let kickMember = message.mentions.members.first();
		let reason = args.slice(1).join(' ');
		if (kickMember) {
			const member = message.guild.member(kickMember);
			if (member) {
				if (reason) {
					member
						.send(
							`\`Hello, you have been kicked from ${message.guild.name}: ${reason}\``
						)
						.then(() => member.kick(`${reason}`))
						.catch((err) => console.log(err));
					message.reply(`${member} was kicked`);
				} else {
					message.reply('Please provide a reason to kick');
				}
			} else {
				message.reply("That user isn't in the guild");
			}
		} else {
			message.reply('Please specify a user to kick');
		}
	},
};
