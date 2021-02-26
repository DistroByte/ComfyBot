const figlet = require('figlet');

module.exports = {
  config: {
    name: 'text',
    description: 'Write stylish text!',
    category: 'fun',
    aliases: ['t'],
    args: true,
    usage: '<text>'
  },
  run: async (client, message, args) => {
    figlet(args.join(' '), function (err, data) {
      if (err) {
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
