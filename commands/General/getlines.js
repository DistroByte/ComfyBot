const Command = require("../../base/Command");

class GetLines extends Command {
  constructor(client) {
    super(client, {
      name: "getlines",
      description: "Gets the commit lines in the repo",
      usage: "[file extension]",
      examples: ["{{p}}getlines", "{{p}}getlines js"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: true,
      args: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    let extension = args[0],
      shell = this.client.commands.get('exec'),
      cmd = extension
        ? `git ls-files | grep "**.${extension}$" | xargs wc -l`
        : 'git ls-files | xargs wc -l';

    shell.run(message, [cmd]);
  }
}

module.exports = GetLines;