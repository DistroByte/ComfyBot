const { MessageEmbed } = require('discord.js');
const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = async (client, oldMessage, newMessage) => {
  if (newMessage.channel.type === 'dm') return
  let guildConfig = await GuildConfig.findOne({ guildId: newMessage.guild.id })

  if (!guildConfig.logEditsDeletes) return
  if (oldMessage.content === newMessage.content) return
  if (oldMessage.channel.type === "dm") return

  let logsChannel = oldMessage.guild.channels.cache.find(x => x.name === 'logs');
  if (oldMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logsChannel) {
    logsChannel = await oldMessage.guild.channels.create('logs', {
      type: 'text',
      permissionOverwrites: [
        {
          id: oldMessage.guild.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: message.guild.roles.cache.find(r => r.name.toLowerCase() === "moderator" || r.name.toLowerCase() === "mod"),
          allow: ['VIEW_CHANNEL'],
        }
      ],
    });
  }

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