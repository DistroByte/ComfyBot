const { sendEmail } = require('../../utils/functions');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, member) => {
  let guildId = member.guild.id
  if (guildId === "759921793422458901") {
    member.send('Hi there! Welcome to the 2024 Computer Applications Discord server! Before we continue, I need to verify you are who you say you are :eyes:\nPlease reply with !verify <student number (CAO number)> (ignore the angle brackets)!');
    member.send('https://imgur.com/a/KkD35jb');
  }
  if (guildId === "802256858198835220") {
    const authCode = Math.floor(Math.random() * 1000000)

    const emailFilter = m => {
      args = m.content.toLowerCase().split("@");
      if (args[1] === "mail.dcu.ie") {
        return true;
      } else if (args[0] === "other") {
        return true;
      } else return false;
    };

    member.send('Welcome to the NAME TBD //TODO server!\nPlease verify using one of the following processes.\n```diff\n+ To verify, please follow these instructions.\n+ If you are using a DCU account, use this method:\n- email <email address>\n\n> Replace the <email address> with your DCU email address, for example:\nemail james.hackett5@mail.dcu.ie\n\n+ If you are using a non DCU account, use this method:\n- other <reason>\n\n> Replace the reason with a reason for joining, for example:\nother I know xyz and he said this server is good fun!\n```')
      .then((m) => {
        m.channel.awaitMessages(emailFilter, { max: 1, time: 60000, errors: ['time'] })
          .then(collected => {
            let args = collected.first().content.split(" ");

            if (args[0] === "email") {
              sendEmail(args[1], authCode, (callback) => {
                if (callback.rejected.length > 0) {
                  member.send("Sorry, there seems to be an error with your email. Please try again!")
                } else {
                  member.send(`Email sent! Check your \`${args[1]}\` inbox! Please send:\n\`\`\`diff\n+ code <your number>\nfor example:\n- code 123456\n\`\`\``)
                    .then((m) => {
                      const codeFilter = m => { return true }

                      m.channel.awaitMessages(codeFilter, { max: 1, time: 180000, errors: ['time'] })
                        .then(collected => {
                          let args = collected.first().content.split(" ")

                          if (parseInt(args[1]) === authCode) {
                            member.roles.add("803274143390105600");
                            member.send("Code accepted!\nWelcome to the server!")
                          } else {
                            member.send("Sorry, that's not the right code. Please try again!")
                          };
                        })
                        .catch((err) => {
                          console.log(err);
                          member.send("Code timeout\n\nPlease verify again.")
                        });
                    })
                }
              });
            } else if (args[0] === "other") {
              verifChannel = member.guild.channels.cache.find((c) => c.id === "803300136410808340");
              console.log(verifChannel);

              const embed = new MessageEmbed()
                .setTitle("User waiting for verification")
                .setColor("orange")
                .setDescription(`${member.tag} is trying to verify with this reason: \`${args.join(" ")}\`.\nTo allow this ${member.tag} in to the server, click their name and add the "external" role`)

              verifChannel.send(embed);
            }
          });
      })
      .catch((err) => {

      })
  }
};