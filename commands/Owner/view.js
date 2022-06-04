const Command = require("../../base/Command.js");
const request = require("request");

class Ping extends Command {

  constructor(client) {
    super(client, {
      name: "view",
      description: "View a channel in a guild",
      usage: "[guild name] [channel name] (limit)",
      examples: ["{{p}}view comfybot general 10"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES"],
      nsfw: false,
      ownerOnly: true,
      cooldown: 1000
    });
  }

  async run(message, args, data) {
    function prettyPrint(fetchedChan, limit = 10) {
      fetchedChan.messages.fetch({ limit }).then(fetched => {
        let buffer = [];
        let count = 0;
        fetched.forEach(msg => {
          count++;
          let msgString;
          if (msg.attachments.first()) {
            msg.attachments.forEach(attach => {
              let attachCount = count;
              shortenUrl(attach.url).then(shortUrl => {
                msgString = `\`${new Date(msg.createdTimestamp).toUTCString()}\` # ${msg.member.displayName}: ${msg.content.replace(/((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/gm, "<$&>")} <${shortUrl}>`;
                buffer.splice(attachCount - 1, 1, msgString);
              });
            });
          }
          msgString = `\`${new Date(msg.createdTimestamp).toUTCString()}\` # ${msg.member.displayName}: ${msg.content.replace(/((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/gm, "<$&>")}`;
          buffer.push(msgString);
        });

        setTimeout(() => { message.channel.send(buffer.slice().reverse(), { split: true }) }, 1500);
      });
    }

    function shortenUrl(url) {
      return new Promise((resolve, reject) => {
        request({
          url: "https://s.dbyte.xyz/api/short/",
          json: { "originalUrl": url },
          method: "POST"
        }, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body.shortUrl);
          };
        }
        );
      });
    }

    function search(guildQuery, channelQuery) {
      return message.client.guilds.cache.filter(guild => guild.name.toLowerCase() == guildQuery).first().channels.cache.filter(chan => chan.name == channelQuery).first();
    }

    prettyPrint(search(args[0], args[1]), args[2]);
  }
}

module.exports = Ping;