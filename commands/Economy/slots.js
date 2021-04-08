const Command = require("../../base/Command"),
  { SlotMachine } = require('slot-machine'),
  symbols = require('./slot-symbols.js'),
  machine = new SlotMachine(3, Object.values(symbols)),
  { MessageEmbed } = require('discord.js')

class Slots extends Command {
  constructor(client) {
    super(client, {
      name: "slots",
      description: "Try your luck at the slots machine!",
      usage: "[bet/max]",
      examples: ["{{p}}slots 1000"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      args: true,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    let bet = args[0],
      { money } = await data.memberData;

    bet = bet === 'max' ? money : Number(bet);

    if (!Number.isInteger(bet) || bet <= 0) {
      return message.reply("Please input a number or \`max\`");
    }

    if (money < bet) {
      return message.reply(`You don't have enough money. You have: ${money}`);
    }

    let member = message.member,
      times = 3 * bet,
      results = machine.play(),
      winnings = Math.ceil(times * results.totalPoints),
      hasWon = results.winCount > 0,
      embed = new MessageEmbed()
        .setTitle("**Slot Machine**")
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(results.visualize(false))
        .setTimestamp();

    hasWon > 0 ? (
      await member.giveMoney(winnings),
      embed.description += `\n\nWow... ${member.displayName} won!\n\nYou have won ${winnings}`
    ) : (
      await member.takeMoney(bet),
      embed.description += `\n\n${member.displayName} has lost!\n\nYou have lost ${bet}`
    );

    embed.addFields(
      {
        name: slot.bet.name,
        value: bet,
        inline: true
      },
      {
        name: slot.result.name,
        value: hasWon ? winnings : -bet,
        inline: true
      },
      {
        name: slot.balance.name,
        value: (await data.memberData.money),
        inline: true
      }
    );

    message.channel.send(embed);
  }
}

module.exports = Slots;
