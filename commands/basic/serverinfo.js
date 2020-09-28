const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'serverinfo',
		description: 'Pulls the serverinfo of the guild!',
		usage: '(command)',
		category: 'basic',
		aliases: ['si', 'serverdesc'],
	},
	run: async (bot, message, args) => {
		let sEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
			.addField('**Guild Name:**', `${message.guild.name}`, true)
			.addField('**Guild Owner:**', `${message.guild.owner}`, true)
			.addField('**Member Count:**', `${message.guild.memberCount}`, true)
			.addField('**Role Count:**', `${message.guild.roles.cache.size}`, true)
			.addField(
				'**Channel Count:**',
				`${message.guild.channels.cache.size}`,
				true
			)
			.setFooter(
				`ComfyBot | Developed by DistroByte`,
				bot.user.displayAvatarURL()
			);
		message.channel.send(sEmbed);
	},
};
