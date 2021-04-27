const { MessageEmbed } = require("discord.js");
const Command = require("../../base/Command");

class Levels extends Command {
  constructor(client) {
    super(client, {
      name: "levels",
      description: "Shows the server leaderboard",
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: ["ranks"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      args: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    const user = message.author;

    let i0 = 0;
    let i1 = 10;

    let memberXp = new Map();
    data.guild.members.forEach(m => { memberXp.set(m.id, m.xp); });
    let leaderboard = [];

    var sortable = new Map([...memberXp.entries()].sort(function (a, b) {
      return b[1] - a[1];
    }));

    var authorRank = 1;
    var ranks = 1;
    for (var [key, value] of sortable.entries()) {
      if (key == user.id) {
        authorRank = ranks;
      }
      leaderboard.push(`\`${ranks}\` **${message.guild.members.cache.get(key)}** *at lvl* ${this.client.functions.getLevel(value) || 0}`);
      ranks += 1;
    }
    var page = 1;

    let embed = new MessageEmbed()
      .setTitle("Leaderboard")
      .setColor(this.client.config.embed.colour)
      .setThumbnail(message.guild.iconURL)
      .setFooter(`Page ${page}`);

    let slice = 0;
    leaderboard.length >= 10 ? slice = 10 : slice = leaderboard.length;

    embed.setDescription(`You (${message.member.displayName}) are rank #${authorRank} (page ${Math.floor(authorRank / 10) + 1})\n${leaderboard.slice(0, slice).join("\n")}`);
    const msg = await message.channel.send(embed);

    try {
      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");
    } catch (err) { }

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 30000 });

    collector.on("collect", async (reaction) => {
      if (reaction._emoji.name === "⬅" && page !== 1) {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        embed.setTitle("Leaderboard")
          .setDescription(`You (${message.member.displayName}) are rank #${authorRank} (page ${Math.floor(authorRank / 10) + 1})\n${leaderboard.slice((page - 1) * 10, (page - 1) * 10 + 10).join("\n")}`)
          .setFooter(`Page ${page}`);

        msg.edit(embed);
      }

      if (reaction._emoji.name === "➡" && page !== Math.floor(ranks / 10)) {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        embed.setTitle("Leaderboard")
          .setDescription(`You (${message.member.displayName}) are rank #${authorRank} (page ${Math.floor(authorRank / 10) + 1})\n${leaderboard.slice((page - 1) * 10, (page - 1) * 10 + 10).join("\n")}`)
          .setFooter(`Page ${page}`);

        msg.edit(embed);
      }

      if (reaction._emoji.name === "❌") {
        return collector.stop();
      }

      try {
        await reaction.users.remove(message.author.id);
      } catch (err) { }
    });
  }
}

module.exports = Levels;