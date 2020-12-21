const { MessageEmbed } = require('discord.js');

module.exports = async (bot, oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return
  let logsChannel = oldMessage.guild.channels.cache.find(x => x.name === 'logs');
  if (oldMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logsChannel) {
    logsChannel = message.guild.channels.create('logs', { type: 'text' });
  }

  console.log(oldMessage, newMessage);

  let embed = new MessageEmbed()
  if (oldMessage.content) {
    embed.setTitle("**EDITED MESSAGE**")
      .setColor("ORANGE")
      .addField("Author", oldMessage.author.username, true)
      .addField("Channel", oldMessage.channel, true)
      .addField("Old Message", oldMessage.content)
      .addField("New Message", newMessage.content)
      .setFooter(`Message ID: ${oldMessage.id} | Author ID: ${oldMessage.author.id}`);
  } else {
    embed.setTitle("**EDITED MESSAGE**")
      .setColor("ORANGE")
      .addField("Channel", newMessage.channel, true)
      .addField("Old Message", "Unknown")
      .addField("New Message", newMessage.content)
      .setFooter(`Message ID: ${newMessage.id} | Author ID: Unknown`);
  }

  logsChannel.send(embed)
}