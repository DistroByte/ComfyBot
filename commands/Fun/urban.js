const Command = require("../../base/Command");

class Urban extends Command {
  constructor(client) {
    super(client, {
      name: "urban",
      description: "Fetches an urban dictionary definition for a word",
      usage: "[word]",
      examples: ["{{p}}urban chocolate"],
      dirname: __dirname,
      enabled: false,
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
    // TODO: make this command work
  }
}

module.exports = Urban;