const Command = require("../../base/Command.js");

class Setafk extends Command {

  constructor(client) {
    super(client, {
      name: "shorten",
      description: "Shorten a URL",
      usage: "[url]",
      examples: ["{{prefix}}shorten https://google.com", "{{prefix}}short https://google.com/search?q=cats"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["short"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false
    });
  }

  async run(message, args, data) {
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
            resolve(res.body);
          };
        }
        );
      });
    }

    shortenUrl(args[0]).then(res => { message.channel.send(`Your shortened URL: <${res.shortUrl}>, accessed ${res.clicks} times.`) })
  }
}

module.exports = Setafk;