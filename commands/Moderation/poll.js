const Command = require("../../base/Command.js"),
  Discord = require("discord.js");

class Poll extends Command {

  constructor(client) {
    super(client, {
      name: "poll",
      description: "Launch a survey in the current channel!",
      usage: "[question]",
      examples: ["{{p}}poll Is the Earth flat?"],
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["MENTION_EVERYONE"],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    const question = args.join(" ");
    if (!question) return message.error("EMPTY");

    message.delete().catch(() => { });

    let mention = "";
    const msg = await message.sendM("Would you like to add a mention to your message?\nAnswer by sending `yes` or `no`!", { prefixEmoji: "loading" });

    const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 240000 });
    collector.on("collect", async (tmsg) => {
      if (tmsg.content.toLowerCase() === "no") {
        tmsg.delete();
        msg.delete();
        collector.stop(true);
      }

      if (tmsg.content.toLowerCase() === "yes") {
        tmsg.delete();
        msg.delete();
        const tmsg1 = await message.sendM("Choose to mention `@`everyone by typing `every` or to mention `@`here by typing `here`!", { prefixEmoji: "loading" });
        const c = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 60000 });
        c.on("collect", (m) => {
          if (m.content.toLowerCase() === "here") {
            mention = "@here";
            tmsg1.delete();
            m.delete();
            collector.stop(true);
            c.stop(true);
          } else if (m.content.toLowerCase() === "every") {
            mention = "@everyone";
            tmsg1.delete();
            m.delete();
            collector.stop(true);
            c.stop(true);
          }
        });
        c.on("end", (collected, reason) => {
          if (reason === "time") {
            return message.error("TIME");
          }
        });
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        return message.error("TIME");
      }

      const success = this.client.emotes?.success.split(":")[1];
      const error = this.client.emotes?.error.split(":")[1];

      const emojis = [
        this.client.emojis.cache.find((e) => e.name === success),
        this.client.emojis.cache.find((e) => e.name === error)
      ];

      const embed = new Discord.MessageEmbed()
        .setAuthor("📊 Poll:")
        .setColor(data.config.embed.color)
        .addField(question, `React with ${emojis[0].toString()} or ${emojis[1].toString()}!`);

      message.channel.send(mention, embed).then(async (m) => {
        await m.react(emojis[0]);
        await m.react(emojis[1]);
      });
    });
  }
}

module.exports = Poll;