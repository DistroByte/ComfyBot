require("./helpers/extenders");
// This enables ComfyBot to access the extenders in any part of the codebase

const util = require("util"),
  fs = require("fs"),
  readdir = util.promisify(fs.readdir),
  mongoose = require("mongoose");
// Some basic imports

const Comfy = require("./base/Comfy"),
  client = new Comfy({ partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"] });
// This requires in Comfy, which extends the base client

const init = async () => {
  // Loads commands
  const dirs = await readdir("./commands/");
  // Reads the commands directory
  dirs.forEach(async (dir) => {
    const cmds = await readdir(`./commands/${dir}/`);
    // gets every dir inside commands
    cmds.filter(cmd => cmd.split(".").pop() === "js").forEach(cmd => {
      const res = client.loadCommand(`./commands/${dir}`, cmd);
      // loads each command
      if (res) client.logger.log(res, "error");
      // if there's an error, log it
    });
  });

  // Loads events
  const evtDirs = await readdir("./events/");
  // reads the events dir
  evtDirs.forEach(async dir => {
    const evts = await readdir(`./events/${dir}/`);
    // gets every dir inside events
    evts.forEach(evt => {
      const evtName = evt.split(".")[0];
      // splits the event and gets first part
      const event = new (require(`./events/${dir}/${evt}`))(client);
      // binds client to the event
      client.on(evtName, (...args) => event.run(...args));
      delete require.cache[require.resolve(`./events/${dir}/${evt}`)];
      // on event, call it
    });
  });

  client.login(client.config.token);
  // log in to discord

  mongoose.connect(client.config.mongoDB, client.config.dbOptions).then(() => {
    client.logger.log("Database connected", "log");
  }).catch(err => client.logger.log("Error connecting to database. Error:" + err, "error"));
};

init();

client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
  .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", (e) => client.logger.log(e, "error"))
  .on("warn", (info) => client.logger.log(info, "warn"));

process.on("unhandledRejection", async (err) => {
  console.error(err);
});
