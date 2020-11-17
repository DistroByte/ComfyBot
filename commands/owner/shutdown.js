const { ownerid, dev1 } = require('../../botconfig.json');

module.exports = {
	config: {
		name: 'shutdown',
		description: 'Shuts down the bot!',
		usage: '',
		category: 'owner',
		accessableby: 'owner',
		aliases: ['botstop', 'restart'],
	},
	run: async (bot, message, args) => {
		if (!message.author.id === ownerid || !message.author.id === dev1)
			return message.channel.send("You're not the bot the owner!");

		try {
			await message.channel.send('Goodbye 👋');
			process.exit();
		} catch (e) {
			message.channel.send(`ERROR: ${e.message}`);
		}
	},
};
