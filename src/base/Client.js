/**
 * @file Defines the modified Client class from the base discord.js client.
 */

const Discord = require('discord.js');
const intents = new Discord.Intents(['GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_INTEGRATIONS']);
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const moment = require('moment');

const Command = require('./Command.js');
const Event = require('./Event.js');

const config = require('../../config');
const responses = require('./responses');

class Client extends Discord.Client {
  constructor(options) {
    super({ intents });

    /**
     * Creates a collection to store Commands in a simple and easy to
     * access way.
     *
     * @type {Discord.Collection<string, Command>}
     */
    this.commands = new Discord.Collection();

    /**
     * Creates a collection to store Command Aliases in a simple and
     * easy to access way.
     *
     * @type {Discord.Collection<string, Command>}
     */
    this.aliases = new Discord.Collection();
    this.config = config;

    /**
     * @type {Array<string>}
     */
    this.responses = responses;

    /**
     * @type {string}
     */
    this.prefix = this.config.prefix;
  }

  async start() {
    const commandCategories = await readdir('./src/commands/');
    commandCategories.forEach(async (category) => {
      const commands = await readdir(`./src/commands/${category}`);
      commands.filter(file => file.endsWith('.js'))
        .forEach(file => {
          /**
           * @type {Command}
           */
          const command = require(`../commands/${category}/${file}`);
          this.commands.set(command.name, command);
          if (command.aliases) {
            command.aliases.forEach(alias => {
              this.aliases.set(alias, command.name);
            });
          }
        });
    });

    const eventCategories = await readdir('./src/events/');
    eventCategories.forEach(async (category) => {
      const events = await readdir(`./src/events/${category}`);
      events.filter(file => file.endsWith('.js'))
        .forEach(file => {
          /**
           * @type {Event}
           */
          const event = require(`../events/${category}/${file}`);
          this.on(event.event, event.run.bind(null, this));
        });
    });

    this.login(this.config.token);
  }

  /**
   * A function to easily resolve a guild member from a mention, id or
   * username search.
   *
   * @param {string} query The member you want to find
   * @param {Discord.Guild} guild The Guild object
   * @returns {Discord.GuildMember} The found GuildMember
   */
  async resolveMember(query, guild) {
    let member;

    if (!query || typeof query !== 'string') return;

    // Get user by `@username`
    if (query.match(/^<@!?(\d+)>$/)) {
      member = await guild.members.fetch(query.match(/^<@!?(\d+)>$/)[1]);

      if (member) {
        return member;
      }
    }

    // Get user by `ID`
    if (query.match(/^[0-9]{17,19}$/)) {
      member = await guild.members.fetch(query.match(/^[0-9]{17,19}$/)[0]);

      if (member) {
        return member.first();
      }
    }

    // Get user by `username`
    if (query.match(/^.{3,32}/)) {
      member = await guild.members.fetch({ query, limit: 1 });

      if (member) {
        return member.first();
      }
    }

    // Get user by `username#discriminator`
    if (query.match(/^.{3,32}#[0-9]{4}$/)) {
      member = await guild.members.fetch({ query, limit: 1 });

      if (member) {
        return member.first();
      }
    }
  }

  /**
   * A function to convert date formats to an easy to read and standard
   * format.
   *
   * @param {Date} date The raw date to be converted
   * @returns {string} The date formatted in an easy to read way
   */
  printDate(date) {
    return moment(new Date(date))
      .locale('UTC')
      .format('hh:mm a, DD-MM-YYYY');
  }
}

module.exports = Client;