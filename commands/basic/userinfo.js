const { MessageEmbed } = require('discord.js');
const { getMember, formatDate } = require('../../functions.js');
const { stripIndents } = require('common-tags');

module.exports = {
	config: {
		name: 'userinfo',
		description: 'Pulls the userinfo of yourself or a user!',
		usage: '(@mention)',
		category: 'miscellaneous',
		aliases: ['ui'],
	},
	run: async (bot, message, args) => {
		const member = getMember(message, args.join(' '));

		const joined = formatDate(member.joinedAt);
		const roles =
			member.roles
				.filter((r) => r.id !== message.guild.id)
				.map((r) => r)
				.join(', ') || 'none';

		const created = formatDate(member.user.createdAt);

		const embed = new MessageEmbed()
			.setFooter(member.displayName, member.user.displayAvatarURL())
			.setThumbnail(member.user.displayAvatarURL())
			.setColor('GREEN')

			.addField(
				'Member Information',
				stripIndents`**> Display Name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`,
				true
			)

			.addField(
				'User Information',
				stripIndents`**> ID:** ${member.user.id}
            **> Uername:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created At:** ${created}`,
				true
			)

			.setTimestamp();

		if (member.user.presence.game) {
			embed.addField(
				'Currently Playing',
				`**> ${member.user.presence.game.name}**`
			);
		}

		message.channel.send(embed);
	},
};
