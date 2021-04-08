const Command = require("../../base/Command"),
  { ReactionCollector } = require('discord.js-collector');

class LeaderBoard extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      description: "Shows the money leaderboard",
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["lb"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      args: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    let contentm = "";

    let memberMoney = new Map();
    i = 0
    data.guild.members.forEach(m => {
      let user = this.client.users.cache.get(m.id) || "Unregistered user";
      memberMoney.set(m.id, `${++i}. ${user} ~ ${m.money}\n`)
    });

    var sortable = new Map([...memberMoney.entries()].sort(function (a, b) {
      console.log(a, "bruh", b)
      return b[0] - a[0];
    }));


    sortable.forEach(e => {
      contentm += e
    });

    const pages = {
      "💸": {
        id: 'money',
        clearReactions: true,
        content: '',
        embed: {
          description: `**${message.guild.name}'s Coin Leaderboard**\n\n${contentm}`
        },
        onMessage: (controller, message) => {
          controller.stop();
        }
      },

      // '🏧': {
      //   id: 'bank',
      //   clearReactions: true,
      //   content: '',
      //   embed: {
      //     description: `**${message.guild.name}'s Bank Leaderboard**\n\n${contentb}`
      //   },
      //   onMessage: (controller, message) => {
      //     controller.stop();
      //   }
      // },

      // '👟': {
      //   id: 'nike',
      //   clearReactions: true,
      //   content: '',
      //   embed: {
      //     description: `**${message.guild.name}'s Nike Leaderboard**\n\n${contentn}`
      //   },
      //   onMessage: (controller, message) => {
      //     controller.stop();
      //   }
      // },

      // '🚙': {
      //   id: 'car',
      //   clearReactions: true,
      //   content: '',
      //   embed: {
      //     description: `**${message.guild.name}'s Car Leaderboard**\n\n${contentc}`
      //   },
      //   onMessage: (controller, message) => {
      //     controller.stop();
      //   }
      // },

      // '🏠': {
      //   id: 'mansion',
      //   clearReactions: true,
      //   content: '',
      //   embed: {
      //     description: `**${message.guild.name}'s Mansion Leaderboard**\n\n${contentma}`
      //   },
      //   onMessage: (controller, message) => {
      //     controller.stop();
      //   }
      // }

    };

    const botMessage = await message.reply(
      `React with 💸 to see the coins leaderboard.`
      // React with 👟 to see nikes leaderboard. 
      // React with 🚙 to see car leaderboard. 
      // React with 🏠 mansion to see mansion leaderboard`
    );

    ReactionCollector.menu({ botMessage, user: message.author, pages });

    //   const embed = new Discord.MessageEmbed()
    //   .setDescription(`**Input a Leaderboard Option**\n\n
    //   Coin Leaderboard: ,leaderboard coins\n
    //   Bank Leaderboard: 
    //   Fresh Nikes Leaderboard: ,leaderboard nikes\n
    //   Car Leaderboard: ,leaderboard car\n
    //   Mansion Leaderboard: ,leaderboard mansion
    //   `)
    //   .setColor("#FFFFFF")

    // if(!args[0]) return message.channel.send(embed);

    // switch(args[0]) {

    //   case "coins":
    //   case "money":
    //   let money = await client.db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
    //   let content = "";

    //   for (let i = 0; i < money.length; i++) {
    //       let user = client.users.cache.get(money[i].ID.split('_')[2]) || "Unregistered user";

    //       content += `${i+1}. ${user} ~ ${money[i].data}\n`

    //     }

    //   const embed = new Discord.MessageEmbed()
    //   .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
    //   .setColor("#FFFFFF")

    //   message.channel.send(embed);

    //   case "bank":
    //     let bank = await client.db.startsWith(`bank_${message.guild.id}`, { sort: '.data'});
    //     let content = "";

    //     for (let i = 0; i < bank.length; i++) {
    //         let user = client.users.cache.get(bank[i].ID.split('_')[2]) || "Unregistered user";

    //         content += `${i+1}. ${user} ~ ${bank[i].data}\n`

    //       }

    //     const embed = new Discord.MessageEmbed()
    //     .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
    //     .setColor("#FFFFFF");

    //     message.channel.send(embed);

    // case "nikes":
    //   let nike = await client.db.startsWith(`nikes_${message.guild.id}`, { sort: '.data'})
    //   let content = "";

    //   for (let i = 0; i < nike.length; i++) {
    //       let user = client.users.cache.get(nike[i].ID.split('_')[2]) || "Unregistered user";

    //       content += `${i+1}. ${user} ~ ${nike[i].data}\n`
    //   }

    //   const embed = new Discord.MessageEmbed()
    //   .setDescription(`**${message.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
    //   .setColor("#FFFFFF")

    //   message.channel.send(embed);

    // case "car":
    //   let cars = await client.db.startsWith(`car_${message.guild.id}`, { sort: '.data'})
    //   let content = "";

    //   for (let i = 0; i < cars.length; i++) {
    //       let user = client.users.cache.get(cars[i].ID.split('_')[2]) || "Unregistered user";

    //       content += `${i+1}. ${user} ~ ${cars[i].data}\n`
    //   }

    //   const embed = new Discord.MessageEmbed()
    //   .setDescription(`**${message.guild.name}'s Car Leaderboard**\n\n${content}`)
    //   .setColor("#FFFFFF")

    //   message.channel.send(embed);

    // case "mansion":
    //   let mansions = await client.db.startsWith(`house_${message.guild.id}`, { sort: '.data'})
    //   let content = "";

    //   for (let i = 0; i < mansions.length; i++) {
    //       let user = client.users.cache.get(mansions[i].ID.split('_')[2]) || "Unregistered user";

    //       content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
    //   }

    //   const embed = new Discord.MessageEmbed()
    //   .setDescription(`**${message.guild.name}'s Mansion Leaderboard**\n\n${content}`)
    //   .setColor("#FFFFFF")

    //   message.channel.send(embed);

    //   }
  }
}

module.exports = LeaderBoard;