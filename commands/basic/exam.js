module.exports = {
  config: {
    name: 'exam',
    aliases: [],
    usage: '<start/stop> <duration>',
    category: 'Basic',
    description: 'Mutes the whole server for an exam',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)
			return message.channel.send(
				'You dont have permission to use this command.'
      );
    
    if (args[0] === "start") {
      
    }
  }
}