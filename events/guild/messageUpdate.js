const { MessageEmbed } = require('discord.js');

module.exports = async (bot, oldMessage, newMessage) => {
  if (oldMessage.author.bot) return
  if (oldMessage.content === newMessage.content) return
  let logsChannel = oldMessage.guild.channels.cache.find(x => x.name === 'logs');

  let embed = new MessageEmbed()
    .setTitle("**EDITED MESSAGE**")
    .setColor("ORANGE")
    .addField("Author", oldMessage.author.tag, true)
    .addField("Channel", oldMessage.channel, true)
    .addField("Old Message", oldMessage.content)
    .addField("New Message", newMessage.content)
    .setFooter(`Message ID: ${oldMessage.id} | Author ID: ${oldMessage.author.id}`);

  logsChannel.send(embed)
}