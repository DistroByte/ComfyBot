/**
 * @file Defines the ready event for the Client. This logs to the console once the client is ready
 * and also changes the status message every 15 minutes.
 */

const Event = require('../../base/Event.js');

module.exports = new Event('ready', (client) => {
  let guildMemberCount = 0;
  let guildCount = 0;
  let guildChannelCount = 0;

  client.guilds.cache.forEach(g => {
    guildMemberCount += g.memberCount;
    guildChannelCount += g.channels.channelCountWithoutThreads;
    guildCount += 1;
  });

  console.log(`${client.user.tag} is online, serving ${guildMemberCount} users in ${guildCount} servers. All Events and Commands loaded.`);

  const activities = [
    `${guildCount} servers!`,
    `${guildChannelCount} channels!`,
    `${guildMemberCount} users!`,
  ];
  let i = 0;
  setInterval(() => {
    client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' });
  }, 15000);

  const proc = process.openStdin();
  proc.addListener('data', res => {
    const chat = res.toString().trim().split(/ +/g);
    if (!chat[1]) return;
    try {
      client.channels.cache.get(chat[0]).send(chat.slice(1).join(' '));
    }
    catch (e) { } // eslint-disable-line no-empty
  });
});
