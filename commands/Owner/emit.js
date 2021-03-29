const Command = require("../../base/Command");

class Emit extends Command {
  constructor(client) {
    super(client, {
      name: "emit",
      description: "Emits an event for testing",
      usage: "[event] [info to pass]",
      examples: ["{{p}}emit message message", "{{p}}emit guildCreate message.guild"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: true,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    this.client.emit(args[0], client, args[1])
  }
}

module.exports = Emit;