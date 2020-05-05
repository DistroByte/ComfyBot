const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'removerole',
		description: 'Removes a role to a member of the guild!',
		usage: '!removerole',
		category: 'moderation',
		accessableby: 'Moderators',
		aliases: ['rr', 'roleremove'],
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR']))
			return message.channel.send(
				"You don't have permission to perform this command!"
			);

		let rMember =
			message.mentions.members.first() ||
			message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
			message.guild.members.cache.get(args[0]);
		if (!rMember)
			return message.channel.send(
				'Please provide a user to remove a role too.'
			);
		let role =
			message.guild.roles.cache.find((r) => r.name == args[1]) ||
			message.guild.roles.cache.find((r) => r.id == args[1]) ||
			message.mentions.roles.first();
		if (!role)
			return message.channel.send(
				'Please provide a role to remove from said user.'
			);
		let reason = args.slice(2).join(' ');
		if (!reason) return message.channel.send('Please provide a reason');

		if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR']))
			return message.channel.send(
				"I don't have permission to perform this command."
			);

		if (!rMember.roles.has(role.id)) {
			return message.channel.send(
				`${rMember.displayName}, doesn't have the role!`
			);
		} else {
			await rMember.roles.remove(role.id).catch((e) => console.log(e.message));
			message.channel.send(
				`The role, ${role.name}, has been removed from ${rMember.displayName}.`
			);
		}
	},
};
