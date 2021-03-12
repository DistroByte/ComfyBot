const ytdl = require('ytdl-core');

module.exports = {
  config: {
    name: 'play',
    aliases: ['p'],
    usage: '<song name>',
    category: 'music',
    description: 'Join a voice channel and play the song!',
    accessableby: 'Members',
    permissions: '',
    args: true,
  },
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

    client.player.play(message, args.join(" "), { firstResult: true });
  }
}