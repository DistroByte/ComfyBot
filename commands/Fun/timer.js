const Command = require("../../base/Command");

class Timer extends Command {
  constructor(client) {
    super(client, {
      name: "timer",
      description: "Starts a countdown!",
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
    message.delete();

    let count = Number(args.pop());

    if (!Number.isInteger(count) || count < 1) {
      message.reply("Please specify a number!");

      return;
    }

    let content = args.join(' ');
    let tick = 1000;

    message.channel.send(this.formatBomb(count)).then(msg => {
      let timer = this.client.setInterval(() => {
        if (count > 0) {
          count--;
          msg.edit(this.formatBomb(count));
        } else {
          clearInterval(timer);
          msg.edit(':boom:');
          this.client.setTimeout(() => {
            msg.edit(content);
          }, tick);
        }
      }, tick);
    });
  }

  formatBomb(count) {
    return `:bomb: ${'-'.repeat(count)} ${count}`;
  }
}

module.exports = Timer;