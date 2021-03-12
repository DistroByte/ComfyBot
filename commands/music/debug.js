module.exports = {
  config: {
    name: 'debug',
    aliases: [],
    usage: '',
    category: 'music',
    description: 'Debugs the current music players',
    accessableby: 'Members',
    permissions: '',
    args: false,
  },
  run: async (client, message, args) => {
    message.channel.send(`${client.emotes.success} - ${client.user.username} connected in **${client.voice.connections.size}** channels!`);
  }
}