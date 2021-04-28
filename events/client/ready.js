module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    const client = this.client;

    client.logger.log(`${client.user.tag} is online, serving ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready"); // logs the client is online

    const checkUnmutes = require("../../helpers/checkUnmutes.js");
    checkUnmutes.init(client); // inits the check unmutes function

    const checkReminds = require("../../helpers/checkReminds.js");
    checkReminds.init(client); // inits the check reminds

    const assignments = require("../../helpers/assignmentsHelper");
    assignments.init(client); // inits the assignmentsHelper

    if (client.config.dashboard && client.config.dashboard.enabled) {
      client.dashboard.load(client); // loads the dashboard if enabled
    }

    let activities = [
      `${client.guilds.cache.size} servers!`,
      `${client.channels.cache.size} channels!`,
      `${client.users.cache.size} users!`,
    ]; // some activites for the bot's status
    let i = 0;
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }); // sets activity every 15s
    }, 15000);
  }
};