const storage = require('storage-to-json');
const correct = new storage('correct');

module.exports = async (bot, message) => {
	let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
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
	if (!message.content.startsWith(bot.prefix)) return;
	let commandfile =
		bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
	if (commandfile) commandfile.run(bot, message, args);
};
