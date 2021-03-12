const { readdirSync } = require("fs");

module.exports = (client) => {
  const load = (dirs) => {
    const events = readdirSync(`./events/${dirs}/`).filter((d) =>
      d.endsWith(".js")
    );
    for (let file of events) {
      const evt = require(`../events/${dirs}/${file}`);
      client.on(file.split(".")[0], evt.bind(null, client));
    }
  };
  ["client", "guild", "message"].forEach((x) => load(x));

  const playerLoad = (dirs) => {
    const events = readdirSync(`./events/${dirs}/`).filter((d) =>
      d.endsWith(".js")
    );
    for (let file of events) {
      const evt = require(`../events/${dirs}/${file}`);
      client.player.on(file.split(".")[0], evt.bind(null, client));
    }
  };
  ["player"].forEach((x) => playerLoad(x))
};
