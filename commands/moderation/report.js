module.exports = {
	config: {
		name: 'report',
		description: 'Reports a user of the guild',
		usage: '<user> <reason>',
		category: 'moderation',
	},
	run: async (bot, message, args) => {
		message.delete({ timeout: 5000, reason: 'tidying up' });
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);
		if (!target)
			return message.channel
				.send('Please provide a valid user')
				.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));

		let reason = args.slice(1).join(' ');
		if (!reason)
			return message.channel
				.send(`Please provide a reason for reporting **${target.user.tag}**`)
				.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));

		let sChannel = message.guild.channels.cache.find(
			(x) => x.name === 'reports'
		);

		message.channel
			.send('Your report has been filed to the staff team. Thank you!')
			.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));
		sChannel
			.send(
				`**${message.author.tag}** has reported **${target.user.tag}** for **${reason}**.`
			)
			.then(async (msg) => {
				await msg.react('✅');
				await msg.react('❌');
			});
	},
};
