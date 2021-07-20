const { MessageEmbed } = require("discord.js");
const Command = require("../../base/Command.js");

class Balance extends Command {
  constructor(client) {
    super(client, {
      name: "balance",
      description: "Get your balance!",
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["bal", "b"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 1000
    });
  }

  async run(message, args, data) {
    const embed = new MessageEmbed().setTitle("Balance");

    if (message.mentions.users.size < 1) {
      embed.setDescription(`Your balance is ${data.userData.money} cushions.`);
      message.channel.send(embed);
    } else {
      let user = message.mentions.users.first();
      if (user.bot) return message.channel.send("Bots can't have money!");
      let userData = await this.client.findOrCreateUser({ id: user.id });
      embed.setDescription(`${user}'s balance is ${userData.money} cushions.`);
      message.channel.send(embed);
    }
  }
}

module.exports = Balance;
