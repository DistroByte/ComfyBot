const { readdirSync } = require("fs");

module.exports = (client) => {
  const load = (dirs) => {
    const commands = readdirSync(`./commands/${dirs}/`).filter((d) =>
      d.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../commands/${dirs}/${file}`);
      try {
        client.commands.set(pull.config.name, pull);
      } catch (e) {
        console.log(e);
      }
      try {
        if (pull.config.aliases) {
          pull.config.aliases.forEach((a) => client.aliases.set(a, pull.config.name));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  [
    "apis",
    "config",
    "dmcommands",
    "fun",
    "info",
    "moderation",
    "music",
    "owner",
    "ranking",
    "reactions"
  ].forEach((x) => load(x));
};
