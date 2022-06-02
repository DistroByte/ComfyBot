const Command = require("../../base/Command.js");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Executes the given code",
      usage: "[code]",
      examples: ["{{p}}eval message.author.send(message.client.token);"],
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

  // eslint-disable-next-line no-unused-vars
  async run(message, args, data) {

    // eslint-disable-next-line no-unused-vars
    const usersData = this.client.usersData;
    // eslint-disable-next-line no-unused-vars
    const guildsData = this.client.guildsData;

    // eslint-disable-next-line no-unused-vars
    function prettyPrint(fetchedChan, limit = 10) {
      fetchedChan.messages.fetch({ limit }).then(fetched => {
        let buffer = [];
        fetched.forEach(msg => {
          let msgString = `\`${new Date(msg.createdTimestamp).toUTCString()}\` # ${msg.member.displayName}: ${msg.content.replace(/((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/gm, "<$&>")}`;
          buffer.push(msgString);
        });
        message.channel.send(buffer.slice().reverse(), { split: true });
      });
    }

    // eslint-disable-next-line no-unused-vars
    function search(guildQuery, channelQuery) {
      return message.client.guilds.cache.get(guildQuery).channels.cache.filter(chan => chan.name == channelQuery).first();
    }

    const content = message.content.split(" ").slice(1).join(" ");
    const result = new Promise((resolve) => resolve(eval(content)));

    return result.then((output) => {
      if (typeof output !== "string") {
        output = require("util").inspect(output, { depth: 0 });
      }
      if (output.includes(this.client.token)) {
        output = output.replace(this.client.token, "T0K3N");
      }
      message.channel.send(output, {
        code: "js", split: true
      });
    }).catch((err) => {
      err = err.toString();
      if (err.includes(this.client.token)) {
        err = err.replace(this.client.token, "T0K3N");
      }
      message.channel.send(err, {
        code: "js"
      });
    });
  }
}

module.exports = Eval;