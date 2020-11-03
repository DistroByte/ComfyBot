const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'unmute',
		description: 'Unmutes a member in the discord!',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Members',
		aliases: ['unm', 'speak'],
	},
	run: async (bot, message, args) => {
		// check if the command caller has permission to use the command
		if (!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)
			return message.channel.send('You dont have permission to use this command.');

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
			message.delete({ timeout: 5000, reason: 'tidying up' });
			mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`)
				.catch((err) => console.log(err));
			message.channel.send(`${mutee.user.username} was unmuted!`);
		});
	},
};
