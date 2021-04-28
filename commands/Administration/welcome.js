const Command = require("../../base/Command.js"),
  Resolvers = require("../../helpers/resolvers");

class Welcome extends Command {

  constructor(client) {
    super(client, {
      name: "welcome",
      description: "Toggle welcome messages!",
      usage: "{{p}}welcome [off/test]",
      examples: ["{{p}}welcome test", "{{p}}goodbye"],
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["MANAGE_GUILD"],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    if (args[0] === "test" && data.guild.plugins.welcome.enabled) {
      this.client.emit("guildMemberAdd", message.member);
      return message.success("Test executed!");
    }

    if ((!args[0] || !["edit", "off"].includes(args[0])) && data.guild.plugins.welcome.enabled)
      return message.error("You must specify an action between `edit` and `off`");

    if (args[0] === "off") {
      data.guild.plugins.welcome = {
        enabled: false,
        message: null,
        channelID: null,
      };
      data.guild.markModified("plugins.welcome");
      data.guild.save();
      return message.error(`**Goodbye messages have just been disabled!**\n\n:arrow_right_hook: *Answer by sending \`${data.guild.prefix}\` to see the updated server configuration!*`);
    } else {
      const welcome = {
        enabled: true,
        channel: null,
        message: null,
      };

      message.sendM("**What channel will welcome messages be sent?**\n\n:arrow_right_hook: *Answer by mentioning a channel!*");
      const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 120000 });

      collector.on("collect", async (msg) => {
        // If the channel is filled and the message is not, it means the user sent the message
        if (welcome.channel && !welcome.message) {
          if (msg.content.length < 1800) {
            welcome.message = msg.content;
            data.guild.plugins.welcome = welcome;
            data.guild.markModified("plugins.welcome");
            await data.guild.save();
            message.sendM(`**Alright, done!**\n\n:arrow_right_hook: *Answer by sending \`${data.guild.prefix}welcome test\` to preview your custom welcome message!*`);
            return collector.stop();
          }
          return message.error("EMBEDLENGTH");
        }

        // If the channel is not filled, it means the user sent it
        if (!welcome.channel) {
          const channel = await Resolvers.resolveChannel({
            message: msg,
            channelType: "text"
          });
          if (!channel) {
            return message.error("CHANNEL");
          }
          welcome.channel = channel.id;
          message.sendM(`**Please enter your desired welcome message.**\n\n**If you want to:**\n*-* __Mention the user__: {user}\n*-* __Get the member count__: {membercount}\n*-* __Get the server name__: {server}\n\n**Usage example:**\nWelcome to {server}, {user}! We are now {membercount}!\n:fast_forward:\nWelcome to ${message.guild.name}, ${msg.author.tag}! We now have ${msg.guild.memberCount} members!`);
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

module.exports = Welcome;