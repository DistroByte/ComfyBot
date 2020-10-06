const storage = require('storage-to-json');
const { MessageEmbed } = require('discord.js');
const { ownerid } = require('../../botconfig.json');

module.exports = {
	config: {
		name: 'messagecount',
		description: 'Returns the number of messages since bot started counting per user',
		category: 'moderation',
		accessableby: 'Moderators',
		aliases: ['messages']
	},
	run: async (bot, message, args) => {
		const count = new storage(`${message.guild.id}`);
		let embed = new MessageEmbed()
			.setTitle(`Leaderboard`)
			.setColor('GREEN')
			.setThumbnail(message.guild.iconURL)
			.setFooter(`© ${message.guild.me.displayName} | Developed By ${bot.users.cache.get(ownerid).tag}`, bot.user.displayAvatarURL())
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
		let n = 1
		objArray.slice(0, 10).forEach((x) => {
			let userKey;
			if (bot.users.cache.get(x.user)) {
				userKey = bot.users.cache.get(x.user).username;
			} else {
				userKey = bot.users.fetch(x.user).username;
			}
			leaderboard.push(`\`${n}\`\t**${userKey}** on **${x.messages}** messages`);
			n = n + 1;
		});

		let authorMessages = objArray.find((x) => x.user === message.author.id);
		let authPos = objArray.findIndex((x) => x.user === message.author.id) + 1;

		embed.addField(`You (${message.author.username}) are in position ${authPos} on ${authorMessages.messages} messages`, leaderboard);
		message.channel.send(embed);
	},
};
// TODO
// var points = [40, 100, 1, 5, 25, 10];
// points.sort(function (a, b) { return a - b });