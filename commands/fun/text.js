const figlet = require('figlet');

module.exports = {
  config: {
    name: 'text',
    description: 'Write stylish text!',
    category: 'fun',
    aliases: ['t'],
  },
  run: async (bot, message, args) => {
    figlet(args.join(' '), function (err, data) {
      if (args.length === 0) {
        message.channel.send('Provide text to style with ```!text <text>```');
        return;
      }
      else if (err) {
        message.channel.send('Something went wrong...');
        return;
      }
      else if (data.length > 2000) {
        message.channel.send('Message is too long...');
        return;
      }
      message.channel.send('```\r' + data + '\r```');
    });
  }
};
