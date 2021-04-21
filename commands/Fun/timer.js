const Command = require("../../base/Command");

class Timer extends Command {
  constructor(client) {
    super(client, {
      name: "timer",
      description: "Sends an bomb into the chat!",
      usage: "[time in seconds] [message to send after]",
      examples: ["{{p}}timer 10 Oh god we're all dead"],
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

    let count = Number(args[0]);

    if (!Number.isInteger(count) || count < 1) {
      return message.error("Please specify a number!");
    }

    let content = args.slice(1).join(' ');
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