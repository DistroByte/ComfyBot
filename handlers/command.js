const { readdirSync } = require("fs");

module.exports = (bot) => {
  const load = (dirs) => {
    const commands = readdirSync(`./commands/${dirs}/`).filter((d) =>
      d.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../commands/${dirs}/${file}`);
      try {
        bot.commands.set(pull.config.name, pull);
      } catch (e) {
        console.log(e);
      }
      try {
        if (pull.config.aliases) {
          pull.config.aliases.forEach((a) => bot.aliases.set(a, pull.config.name));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  [
    "basic",
    // "collaboration",
    "miscellaneous",
    "moderation",
    "owner",
    "reactions"
  ].forEach((x) => load(x));
};
