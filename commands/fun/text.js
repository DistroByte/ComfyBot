const figlet = require('figlet');

module.exports = {
  config: {
    name: 'text',
    description: 'Write stylish text!',
    category: 'fun',
    aliases: ['t'],
  },
  run: async (bot, message, args) => {
	figlet(args.join(' '), function(err, data) {
		if (err) {
			message.channel.send('Something went wrong...');
			console.dir(err);
			return;
		}
		else if (data.length > 2000) {
			message.channel.send('Message is too long...');
			console.log('Error: Message is too long.')
			return;
		}
		message.channel.send(data)
	});
  }
};
