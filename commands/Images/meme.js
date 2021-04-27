const Command = require("../../base/Command"),
  { MessageEmbed } = require("discord.js"),
  api = require("imageapi.js");

class Meme extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      description: "Gets a meme from a subreddit!",
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      args: false,
      cooldown: 30000
    });
  }

  async run(message, args, data) {
    var subreddit = [
      "2meirl4meirl",
      "AdviceAnimals",
      "AnimeFunny",
      "MemeEconomy",
      "MemesOfAnime",
      "animememes",
      "animemes",
      "dankmeme",
      "dankmemes",
      "me_irl",
      "meirl",
      "meme",
      "techsupportanimals",
      "wholesomememes"
    ];
    var randomNum = Math.round(Math.random() * subreddit.length),
      image = await api(subreddit[randomNum]),
      embed = new MessageEmbed()
        .setTitle(`A Meme From ${subreddit[randomNum]}`)
        .setColor("RANDOM")
        .setImage(image);

    message.channel.send(embed);
  }
}

module.exports = Meme;