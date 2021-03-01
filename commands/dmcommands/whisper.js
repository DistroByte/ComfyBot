const GuildConfig = require('../../database/schemas/GuildConfig')

module.exports = {
  config: {
    name: 'whisper',
    aliases: ['w'],
    usage: '<identifier> <message>',
    category: 'dmcommands',
    description: 'Sends your message anonymously to a channel.',
    accessableby: 'Members',
    permissions: '',
    args: true,
  },
  run: async (client, message, args) => {
    console.log(message.author.username, message.content)
    channel = client.channels.cache.get('815116475069235221')
    channel.send(args.join(" "))
  }
}