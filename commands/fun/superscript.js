var raise = require('superscript-text')

module.exports = {
  config: {
    name: 'superscript',
    aliases: ['ss'],
    usage: '<text>',
    category: 'fun',
    description: 'Makes text superscript',
    accessableby: 'Members',
    permissions: '',
    args: true,
  },
  run: async (client, message, args) => {
    message.channel.send(raise(args.join(" ")))
  }
}