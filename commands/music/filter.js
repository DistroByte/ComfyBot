module.exports = {
  config: {
    name: 'filter',
    aliases: [],
    usage: '<filter name>',
    category: 'music',
    description: 'Applys a filter to the music',
    accessableby: 'Members',
    permissions: '',
    args: true,
  },
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing!`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Please specify a valid filter to enable or disable!`);

    const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

    if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - This filter doesn't exist, try for example (8D, vibrato, pulsator, etc)!`);

    const filtersUpdated = {};

    filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.music} - I'm **adding** the filter to the music, please wait. Note: the longer the music is, the longer this will take.`);
    else message.channel.send(`${client.emotes.music} - I'm **disabling** the filter on the music, please wait. Note: the longer the music is playing, the longer this will take.`);
  }
}