var moment = require('moment-timezone');
const Storage = require('storage-to-json');
const store = new Storage('userTime');
const { MessageEmbed } = require('discord.js')

module.exports = {
	config: {
		name: 'time',
		usage: '(set) (zone)',
		description:
			'Gets local time and UTC time. Also allows you to set a local timezone. Go to https://momentjs.com/timezone/ to find your timezone',
		category: 'basic',
	},
	run: async (bot, message, args) => {
		let id = message.author.id;

		if (args[0] === 'set') {
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
		if (!timezone) return message.channel.send('Please set your timezone with `!time set <timezone>`.\nGo to https://momentjs.com/timezone/ to find your timezone!')
		let mL = moment().tz(timezone).format('Do MMM YYYY | HH:mm:ss | Z');
		let mU = moment.utc().format('Do MMM YYYY | HH:mm:ss |');
		let embed = new MessageEmbed()
			.addField(`Local time`, `${mL}`, true)
			.addField(`UTC time`, `${mU}`, true)
			.setColor('GREEN')
		message.channel.send(embed);
	},
};
