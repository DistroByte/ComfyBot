const { prefix } = require('../../botconfig.json');
const storage = require('storage-to-json');
const correct = new storage('correct');
const podNumbers = new storage('podNumbers')

module.exports = async (bot, message) => {
	let args = message.content.slice(prefix.length).trim().split(/ +/g);
	let cmd = args.shift().toLowerCase();

	let correctme = correct.get();
	if (!message.author.bot) {
		if (!message.content.includes('correct')) {
			for (var key in correctme) {
				var value = correctme[key];
				if (message.content.toLowerCase().includes(key)) {
					message.channel.send(value);
				}
			}
		}
	}

	if (message.guild !== null) {

		const count = new storage(`${message.guild.id}`);
		let date = new Date().toString().slice(4, 24);
		if (!count.get('Total')) {
			count.set(`Total`, `${date} 1`);
		}
		if (!count.get(`${message.author.id}`)) {
			let messageCount = 1;
			count.set(`${message.author.id}`, messageCount);
		} else {
			let messageCount = count.get(`${message.author.id}`);
			messageCount++;
			count.set(`${message.author.id}`, messageCount);
		}

		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;
		let commandfile =
			bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
		if (commandfile) commandfile.run(bot, message, args);
	} else {
		if (message.author.bot) return
		let number = [];
		podNumbers.each((v, k) => {
			number.push(k);
		});
		let toFind = number.find(v => v === message.content)
		if (!toFind) {
			message.reply('Sorry! It seems like you are not in this course! Thanks for stopping by :slight_smile:');
		} else {
			let CAGuild = bot.guilds.cache.find(guild => guild.id === "759921793422458901");
			let userToVerify = CAGuild.members.cache.find(u => u.id === message.author.id)
			userToVerify.roles.add("760604574217273415");
			message.reply('Success! Welcome to the server!');
			console.log('New member added!');
			podNumbers.remove(toFind);
		}
	}
};
