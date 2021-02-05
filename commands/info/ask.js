module.exports = {
  config: {
    name: 'ask',
    category: 'info',
    description: 'Responds with an image',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    message.channel.send('Don\'t ask to ask, just ask!')
    message.channel.send('https://cdn.discordapp.com/attachments/762797129626288129/770619652127719464/ask.png')
  }
}