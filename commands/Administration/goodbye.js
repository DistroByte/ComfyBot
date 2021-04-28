const Command = require("../../base/Command.js"),
  Resolvers = require("../../helpers/resolvers");

class Goodbye extends Command {

  constructor(client) {
    super(client, {
      name: "goodbye",
      description: "Toggle goodbye messages!",
      usage: "{{p}}goodbye [test/off]",
      examples: ["{{p}goodbye test", "{{p}}goodbye"],
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: ["au-revoir"],
      memberPermissions: ["MANAGE_GUILD"],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    if (args[0] === "test" && data.guild.plugins.goodbye.enabled) {
      this.client.emit("guildMemberRemove", message.member);
      return message.success("Test executed!");
    }

    if ((!args[0] || !["edit", "off"].includes(args[0])) && data.guild.plugins.goodbye.enabled)
      return message.error("You must specify an action between `edit` and `off`");

    if (args[0] === "off") {
      data.guild.plugins.goodbye = {
        enabled: false,
        message: null,
        channelID: null,
      };
      data.guild.markModified("plugins.goodbye");
      data.guild.save();
      return message.error(`**Goodbye messages have just been disabled!**\n\n:arrow_right_hook: *Answer by sending \`${data.guild.prefix}configuration\` to see the updated server configuration!*`);
    } else {
      const goodbye = {
        enabled: true,
        channel: null,
        message: null,
      };

      message.sendM("**In which channel will goodbye messages be sent?**\n\n:arrow_right_hook: *Answer by mentioning a channel!*");
      const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 120000 });

      collector.on("collect", async msg => {
        // If the channel is filled and the message is not, it means the user sent the message
        if (goodbye.channel && !goodbye.message) {
          if (msg.content.length < 1800) {
            goodbye.message = msg.content;
            data.guild.plugins.goodbye = goodbye;
            data.guild.markModified("plugins.goodbye");
            await data.guild.save();
            message.sendM(`**Alright, done!**\n\n:arrow_right_hook: *Answer by sending \`${data.guild.prefix}goodbye test\` to preview your custom goodbye message!*`);
            return collector.stop();
          }
          return message.error("EMBEDLENGTH");
        }

        // If the channel is not filled, it means the user sent it
        if (!goodbye.channel) {
          const channel = await Resolvers.resolveChannel({
            message: msg,
            channelType: "text"
          });
          if (!channel) {
            return message.error("CHANNEL");
          }
          goodbye.channel = channel.id;
          message.sendM(`**Please enter your desired goodbye message.**\n\n**If you want to:**\n*-* __Mention the user__: {user}\n*-* __Get the member count__: {membercount}\n*-* __Get the server name__: {server}\n\n**Usage example:**\nGoodbye {user}, we will miss you! We are now {membercount}.\n:fast_forward:\nGoodbye ${msg.author.tag}, we will miss you! We are now ${msg.guild.memberCount}.`);
        }
      });

      collector.on("end", (_, reason) => {
        if (reason === "time") {
          return message.error("TIME");
        }
      });
    }
  }
}

module.exports = Goodbye;