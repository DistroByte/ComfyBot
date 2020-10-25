const { MessageEmbed } = require('discord.js');

module.exports = async (bot, oldMessage, newMessage) => {
  if (oldMessage.author.bot) return
  if (oldMessage.content === newMessage.content) return  
  let logs = oldMessage.guild.channels.cache.find(x => x.name === 'logs');
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.channels.create('logs', { type: 'text' });
  }

  let embed = new MessageEmbed()
    .setTitle("**EDITED MESSAGE**")
    .setColor("ORANGE")
    .addField("Author", oldMessage.author.tag, true)
    .addField("Channel", oldMessage.channel, true)
    .addField("Old Message", oldMessage.content)
    .addField("New Message", newMessage.content)
    .setFooter(`Message ID: ${oldMessage.id} | Author ID: ${oldMessage.author.id}`);

  logs.send(embed)
}