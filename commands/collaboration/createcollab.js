module.exports = {
	config: {
		name: 'createcollab',
		description:
			'Creates a new role and text channel group for a collaboration',
		usage: '<name>',
		category: 'collaboration',
		accessableby: 'Members',
		aliases: ['collab', 'newcollab', 'project'],
	},
	run: async (bot, message, args) => {
		message.delete();
		let name = args.slice(0).join('-').toLowerCase();
		let parent = message.channel.parent;
		if (!name)
			return message.channel
				.send("What's your project name?")
				.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));
		message.channel
			.send(`Creating a collaboration channel with name: \`${name}\``)
			.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));

		message.guild.roles
			.create({
				name: name,
				permissions: [],
			})
			.then((role) => message.member.roles.add(role));

		let permissionOverwriteArray1 = [
			ADD_REACTIONS,
			READ_MESSAGES,
			SEND_MESSAGES,
			EMBED_LINKS,
			ATTACH_FILES,
			READ_MESSAGE_HISTORY,
			MENTION_EVERYONE,
			EXTERNAL_EMOJIS,
		];

		message.guild.channels.create(name, { type: 'text' }).then((chan) => {
			chan.setParent(parent).then((chan2) => {
				chan2.overwritePermissions(
					message.guild.roles.cache.find((role) => role.name === '@everyone'),
					{ READ_MESSAGES: false }
				);
				message.guild.roles.cache.find((role) => role.name === name),
					{
						CREATE_INSTANT_INVITE: false,
						ADD_REACTIONS: true,
						READ_MESSAGES: true,
						SEND_MESSAGES: true,
						EMBED_LINKS: true,
						ATTACH_FILES: true,
						READ_MESSAGE_HISTORY: true,
						MENTION_EVERYONE: true,
						EXTERNAL_EMOJIS: true,
					};
			});
		});

		message.channel
			.send('Created a new collaboration channel!')
			.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));
	},
};
