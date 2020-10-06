const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');

module.exports = {
	config: {
		name: 'serverinfo',
		description: 'Pulls the serverinfo of the guild!',
		usage: '(command)',
		category: 'basic',
		aliases: ['si', 'serverdesc'],
	},
	run: async (bot, message, args) => {
		let time = message.guild.createdAt.toString()
		let sEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
			.addField('**Guild Name:**', `${message.guild.name}`)
			.addField('**Guild Owner:**', `${message.guild.owner}`)
			.addField('**Member Count:**', `${message.guild.memberCount}`)
			.addField('**Role Count:**', `${message.guild.roles.cache.size}`)
			.addField('**Channel Count:**', `${message.guild.channels.cache.size}`)
			.addField('**Creation Date:**', `${time.slice(0, 15)}`)
			.addField('**Number of Emojis:**', `${message.guild.emojis.cache.size}`)
			.setFooter(`ComfyBot | Developed by ${bot.users.cache.get(ownerid).tag}`, bot.user.displayAvatarURL());
		message.channel.send(sEmbed);
	},
};
