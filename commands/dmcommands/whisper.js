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
    hidden: true
  },
  run: async (client, message, args) => {
    if (message.channel.type !== 'dm') return message.channel.send('This is a DM only command!')
    console.log(message.author.username, message.content)
    if (message.content.includes('everyone')) return message.channel.send('Oops, nice try :p')
    channel = client.channels.cache.get('815116475069235221')
    channel.send(args.join(" "))
  }
}