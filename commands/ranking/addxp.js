const GuildLevels = require('../../database/schemas/GuildLevels');
const { ownerid } = require('../../botconfig.json')

module.exports = {
  config: {
    name: 'addxp',
    aliases: ['xpadd'],
    usage: '<user> <amount>',
    category: 'ranking',
    description: 'Adds XP to a user',
    accessableby: 'Owner',
    args: true
  },
  run: async (client, message, args) => {
    if (!message.author.id == ownerid) return message.channel.send("You don't have the correct perms!")

    if (!message.mentions.members.first()) return message.channel.send("Please specify a user!")
    if (!args[1]) return message.channel.send("Please specify amount of xp to add!")
    let guildLevels = await GuildLevels.findOne({
      guildId: message.guild.id
    }).exec()

    let membersXp = guildLevels.memberXp;
    let userAdd = message.mentions.members.first();
    let memberXp = Number(membersXp.get(userAdd.user.id))
    membersXp.set(`${userAdd.user.id}`, `${memberXp + Number(args[1])}`)
    guildLevels.save();

    message.channel.send("Success!");
  }
}