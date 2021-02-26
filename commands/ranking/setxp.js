const GuildLevels = require('../../database/schemas/GuildLevels');
const { ownerid } = require('../../botconfig.json')

module.exports = {
  config: {
    name: 'setxp',
    aliases: ['xpset'],
    usage: '<user> <amount>',
    category: 'ranking',
    description: 'Sets a user\'s XP',
    accessableby: 'Owner',
    args: true
  },
  run: async (client, message, args) => {
    if (!message.author.id == ownerid) return message.channel.send("You don't have the correct perms!")

    if (!message.mentions.members.first()) return message.channel.send("Please specify a user!")
    if (!args[1]) return message.channel.send("Please specify amount of xp to set!")
    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let membersXp = guildLevels.memberXp;
    let userAdd = message.mentions.members.first();
    membersXp.set(`${userAdd.user.id}`, `${Number(args[1])}`)
    guildLevels.save();

    message.channel.send("Success!");
  }
}