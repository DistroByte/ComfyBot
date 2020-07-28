const { MessageEmbed } = require('discord.js');
const Store = require('storage-to-json');
const guildConfigStore = new Store('guildConfigStore');

module.exports = {
  config: {
    name: 'post',
    aliases: [],
    usage: '<title of track> ; <artist name> ; <link> ; <description>',
    category: 'basic',
    description: 'Allows users to post a track in a certain channel',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    let guildId = message.guild.id;
    let guildConfig = await guildConfigStore.get(guildId);

    let messageContent = message.content.slice(6).split(';');
    let title = messageContent[0];
    let name = messageContent[1];
    let link = messageContent[2];
    let desc = messageContent[3].trim();

    if (!title || !name || !link || !desc) {
      return message.channel.send('Please follow this format including the `;`:\n<title of track>; <artist name>; <link>; <description>')
    }
    let msg = `<@&713774707823870002> **${title}** by**${name}** (<@${message.author.id}>)\n${desc}\n${link}`

    bot.channels.cache.get(guildConfig.newReleaseChannel).send(msg);
  }
}