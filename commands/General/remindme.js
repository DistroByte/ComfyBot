const Command = require("../../base/Command.js"),
  ms = require("ms");

class Remindme extends Command {

  constructor(client) {
    super(client, {
      name: "remindme",
      description: "Add a new personal reminder",
      usage: "[time] [message]",
      examples: ["{{p}}remindme 24h Work command", "{{p}}remindme 3m Check on the pasta!"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["reminder", "remind"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false
    });
  }

  async run(message, args, data) {
    const time = args[0];
    if (!time || isNaN(ms(time))) {
      return message.error("TIMEARGS");
    }

    const msg = args.slice(1).join(" ");
    if (!msg) {
      return message.error("EMPTY");
    }

    const rData = {
      message: msg,
      messageURL: message.url,
      createdAt: Date.now(),
      sendAt: Date.now() + ms(time)
    };

    if (!data.userData.reminds) {
      data.userData.reminds = [];
    }

    data.userData.reminds.push(rData);
    data.userData.markModified("reminds");
    data.userData.save();
    this.client.databaseCache.usersReminds.set(message.author.id, data.userData);

    // Send success message
    message.success(`Reminder set! I will remind you in \`${time}\``);
  }
}

module.exports = Remindme;