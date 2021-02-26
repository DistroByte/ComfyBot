const { ownerid } = require('../../botconfig.json');

module.exports = {
  config: {
    name: 'role',
    aliases: [],
    usage: '<add/remove> <role>',
    category: 'owner',
    description: 'Owner only command',
    accessableby: 'Owner',
    args: true
  },
  run: async (client, message, args) => {
    message.delete();
    if (message.author.id !== ownerid) return
    let memberObj = message.guild.members.cache.find(u => u.id === ownerid);
    if (args[1] === "add") {
      memberObj.roles.add(message.guild.roles.cache.find(r => r.name === args[0]));
      console.log(`Added role ${args[0]}`);
    }
    if (args[1] === "remove") {
      memberObj.roles.remove(message.guild.roles.cache.find(r => r.name === args[0]));
      console.log(`Removed role ${args[0]}`);
    }
  }
}