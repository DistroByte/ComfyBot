const Storage = require("storage-to-json");
const podNumbers = new Storage('podNumbers');

module.exports = {
  config: {
    name: 'verify',
    description: 'DM command, for CA',
    category: 'DM Commands',
  },
  run: async (bot, message, args) => {
    if (message.channel.type != 'dm') return message.reply('This command can only be used in DMs.');
    if (!args[0]) return message.reply('Please type \`!verify <your tudent/CAO number>\`!\nDon\'t include the < >!');

    let number = [];
    podNumbers.each((v, k) => {
      number.push(k);
    });


    let toFind = number.find(v => v === args[0])
    if (!toFind) {
      message.reply('Sorry! It seems like you are not in this course or your student number is incorrect! Thanks for stopping by :slight_smile:');
      console.log(`${message.author.username} failed with number ${args[0]}!`);
    } else {
      let CAGuild = bot.guilds.cache.find(guild => guild.id === "759921793422458901");
      let userToVerify = CAGuild.members.cache.find(u => u.id === message.author.id)
      userToVerify.roles.add("760604574217273415");
      message.reply('Success! Welcome to the server!');
      console.log(`${message.author.username} added with number ${toFind}!`);
    }
  },
};
