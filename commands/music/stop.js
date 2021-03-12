module.exports = {
  config: {
    name: 'stop',
    aliases: ['quit'],
    usage: '',
    category: 'music',
    description: 'Stops the current music player',
    accessableby: 'Members',
    permissions: '',
    args: false,
  },
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing!`);

    client.player.setRepeatMode(message, false);
    const success = client.player.stop(message);

    if (success) message.channel.send(`${client.emotes.success} - Music **stopped** in this server!`);
  }
}