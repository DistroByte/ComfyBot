const Command = require("../../base/Command"),
  { promisify } = require('util'),
  exec = promisify(require('child_process').exec);

class Exec extends Command {
  constructor(client) {
    super(client, {
      name: "exec",
      description: "Allows shell commands to be run",
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: true,
      args: true,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    let cmd = args.join(' ');

    try {
      let { stdout: res } = await exec(cmd);

      res = res.replace(this.client.token, "T0K3N")

      message.channel.send(`\`\`\`\n${cmd}\n\n${res}\n\`\`\``, { split: true });
    } catch (e) {
      this.client.logger.log(e.stderr || e.message, "error");
      message.channel.send("Something went wrong!");
    }
  }
}

module.exports = Exec;