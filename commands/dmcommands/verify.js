const Storage = require("storage-to-json");
const podNumbers = new Storage('podNumbers');
const { sendEmail } = require('../../utils/functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'verify',
    description: 'DM command, for CA',
    category: 'DM Commands',
  },
  run: async (bot, message, args) => {
    if (message.channel.type != 'dm') return message.reply('This command can only be used in DMs.');
    if (!args[0]) return message.reply('Please specify verification type!');

    const emailFilter = m => {
      emailArgs = m.toLowerCase().split("@");
      if (emailArgs[1] === "mail.dcu.ie") {
        return true;
      } else return false;
    };

    if (args[0] === "number") {
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
    }

    if (args[0] === "email") {
      if (args[1].toLowerCase() === "dcu-esports") {
        if (emailFilter(args[2])) {
          const authCode = Math.floor(Math.random() * 1000000)
          bot.authCodes.set(message.author.id, authCode);
          sendEmail(args[2], authCode, (callback) => {
            if (callback.rejected.length > 0) {
              message.channel.send("Sorry, there seems to be an error with your email. Please try again!")
            } else {
              message.channel.send(`Email sent! Check your \`${args[2]}\` inbox! Please send:\n\`\`\`diff\n+ !verify code DCU-Esports <code>\nfor example:\n- !verify code DCU-Esports 123456\n\`\`\``)
            }
          })
        } else {
          message.channel.send(`Sorry, please check your email address and try again!`)
        }
      } else {
        message.channel.send("Please specify what server you want to verify in!")
      }
    }

    if (args[0] === "code") {
      if (args[1].toLowerCase() === "dcu-esports") {
        let authCode = bot.authCodes.get(message.author.id);
        let guildToFind = bot.guilds.cache.find(g => g.id === "802256858198835220")
        let member = guildToFind.members.cache.find(m => m.id === message.author.id)
        if (parseInt(args[2]) === authCode) {
          member.roles.add("803274143390105600");
          member.send("Code accepted!\nWelcome to the server!")
          bot.authCodes.delete(message.author.id);
          console.log("User added to DCU-Esports");
        } else {
          member.send("Sorry, that's not the right code. Please verify with your email again!")
        };
      } else {
        message.channel.send("Please specify what server you want to verify in!")
      }
    }

    if (args[0] === "other") {
      if (args[1].toLowerCase() === "dcu-esports") {
        let guildToFind = bot.guilds.cache.find(g => g.id === "802256858198835220")
        let member = guildToFind.members.cache.find(m => m.id === message.author.id)
        verifChannel = member.guild.channels.cache.find((c) => c.id === "803300136410808340");

        const embed = new MessageEmbed()
          .setTitle("User waiting for verification")
          .setColor("orange")
          .setDescription(`${member} is trying to verify!`, `\`${args.slice(2).join(" ")}\`.`)
          .addField("Reason:", `\`${args.slice(2).join(" ")}\`.`)
          .addField("Actions:", `To allow ${member} in to the server, click their name and add the "external" role`)
          .setColor("ORANGE");

        verifChannel.send(embed);
      } else {
        message.channel.send("Please specify what server you want to verify in!")
      }
    }
  },
};
