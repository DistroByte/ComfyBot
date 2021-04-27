const Command = require("../../base/Command.js");

class Deletemod extends Command {

  constructor(client) {
    super(client, {
      name: "deletemod",
      description: "Toggle moderation commands auto deletion!",
      usage: "[on/off]",
      examples: ["{{p}}deletemod on", "{{p}}deletemod off"],
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: ["autodeletemodcommands"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    const status = args[0];
    if (!status || status !== "on" && status !== "off") {
      return message.error("You must specify `on` or `off`");
    }
    if (status === "on") {
      data.guild.autoDeleteModCommands = true;
      data.guild.save();
      message.success("Automatic moderation commands deletion **enabled**");
    } else {
      data.guild.autoDeleteModCommands = false;
      data.guild.save();
      message.success("Automatic moderation commands deletion **disabled**!");
    }
  }
}

module.exports = Deletemod;