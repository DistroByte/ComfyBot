const storage = require('storage-to-json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'messagecount',
		description: 'Returns the number of messages since bot started counting per user',
		category: 'moderation',
		accessableby: 'Moderators',
		aliases: ['messages']
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission(['ADMINISTRATOR']))
			return message.channel.send('You dont have permission to perform this command!');

		const count = new storage(`${message.guild.id}`);
		let embed = new MessageEmbed()
			.setTitle(`Leaderboard`)
			.setColor('GREEN')
			.setThumbnail(message.guild.iconURL)
			.setFooter(`© ${message.guild.me.displayName} | Developed By DistroByte`, bot.user.displayAvatarURL())
			.setTimestamp();

		let regexTotal = /Total/;
		let date = new Date().toString().slice(4, 24);
		let runningTotal = 0;

		let objArray = [];
		count.each((messages, user) => {
			let obj = { messages, user }
			objArray.push(obj);
		});

		let unused = objArray.shift();
		function compare(a, b) {
			if (a.messages < b.messages) {
				return 1;
			}
			if (a.messages > b.messages) {
				return -1;
			}
			return 0;
		}

		objArray.sort(compare);
		let leaderboard = [];
		objArray.slice(0, 9).forEach((x) => {
			let userKey;
			if (bot.users.cache.get(x.user)) {
				userKey = bot.users.cache.get(x.user).username;
			} else {
				userKey = bot.users.fetch(x.user).username;
			}
			leaderboard.push(`**${userKey}** on **${x.messages}** messages`)
		});

		let authorMessages = objArray.find((x) => x.user === message.author.id);

		embed.addField(`You ${message.author.username} are on ${authorMessages.messages}`, leaderboard);
		message.channel.send(embed);
	},
};
// TODO
// var points = [40, 100, 1, 5, 25, 10];
// points.sort(function (a, b) { return a - b });