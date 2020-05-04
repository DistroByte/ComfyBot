const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'collabsetup',
		description: 'Edt your channel!',
		usage: '<addfiles|addvoice|adduser @user>',
		category: 'collaboration',
		accessableby: 'Members',
		aliases: ['cs', 'setup'],
	},
	run: async (bot, message, args) => {
		message.delete(5000);

		if (!args[0])
			return message.channel
				.send('Please specify what you would like to set up')
				.then((m) => m.delete(5000));

		let chan = message.channel.name;
		let role = message.guild.roles.cache.find((role) => role.name === chan);
		let user = message.mentions.members.first();
		let parent = message.channel.parent;

		const embed = new MessageEmbed()
			.setTitle('Project Update')
			.setDescription('');

		for (var i = 0; i < 3; i++) {
			if (args[i] == 'addvoice') {
				if (
					message.guild.channels.cache.find(
						(c) => c.name === chan.toUpperCase() + ' Voice'
					)
				) {
					message.channel
						.send('You already have a voice channel')
						.then((m) => m.delete(5000));
				} else {
					message.guild
						.createChannel(chan.toUpperCase() + ' Voice', { type: 'voice' })
						.then((chan1) => {
							chan1.setParent(parent).then((chan2) => {
								chan2.overwritePermissions(
									message.guild.roles.cache.find(
										(role) => role.name === '@everyone'
									),
									{ READ_MESSAGES: false }
								);
								chan2.overwritePermissions(role, {
									CREATE_INSTANT_INVITE: false,
									ADD_REACTIONS: true,
									READ_MESSAGES: true,
									SEND_MESSAGES: true,
									EMBED_LINKS: true,
									ATTACH_FILES: true,
									READ_MESSAGE_HISTORY: true,
									MENTION_EVERYONE: true,
									EXTERNAL_EMOJIS: true,
								});
							});
						});
					embed.addField(`${chan.toUpperCase()} Voice channel added`);
				}
			} else {
			}

			if (args[i] == 'addfiles') {
				if (
					message.guild.channels.cache.find((c) => c.name === chan + '-files')
				) {
					message.channel
						.send('You already have a files channel')
						.then((m) => m.delete(5000));
				} else {
					message.guild
						.createChannel(chan.toUpperCase() + ' Files', { type: 'text' })
						.then((chan1) => {
							chan1.setParent(parent).then((chan2) => {
								chan2.overwritePermissions(
									message.guild.roles.cache.find(
										(role) => role.name === '@everyone'
									),
									{ READ_MESSAGES: false }
								);
								chan2.overwritePermissions(role, {
									CREATE_INSTANT_INVITE: false,
									ADD_REACTIONS: true,
									READ_MESSAGES: true,
									SEND_MESSAGES: true,
									EMBED_LINKS: true,
									ATTACH_FILES: true,
									READ_MESSAGE_HISTORY: true,
									MENTION_EVERYONE: true,
									EXTERNAL_EMOJIS: true,
								});
							});
						});
					embed.addField(`${chan.toUpperCase()} Files channel added`);
				}
			} else {
			}

			if (args[i] == 'addmember') {
				if (user) {
					user.roles.add(role);
					embed.addField(`${user} has been added to the channel`);
				} else {
					message.channel
						.send('Please specify a member to add')
						.then((m) => m.delete(5000));
				}
			} else {
			}
		}

		if (!(embed.length <= embed.title.length)) {
			message.channel.send(embed);
		}
	},
};
