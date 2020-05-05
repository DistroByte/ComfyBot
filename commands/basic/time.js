var moment = require('moment-timezone');
const Storage = require('storage-to-json');
const store = new Storage('userTime');

module.exports = {
	config: {
		name: 'time',
		usage: '(setzone) (zone)',
		description:
			'Gets local time and UTC time. Also allows you to set a local timezone. Go to https://momentjs.com/timezone/ to find your timezone',
		category: 'basic',
	},
	run: async (bot, message, args) => {
		let id = message.author.id;

		if (args[0] === 'setzone') {
			if (!args[1])
				return message.channel
					.send('Go to https://momentjs.com/timezone/ to find your timezone')
					.then((m) => m.delete({ timeout: 15000, reason: 'tidying up' }));
			let userTime = args[1].toString();
			store.set(id, userTime);
			message.channel
				.send(`${args[1]} is now saved as your local timezone`)
				.then((m) => m.delete({ timeout: 5000, reason: 'tidying up' }));
			return;
		}
		let timezone = store.get(id);
		let mL = moment().tz(timezone);
		let mU = moment.utc();

		message.channel.send(`Local: ${mL}\nUTC: ${mU}`);
	},
};
