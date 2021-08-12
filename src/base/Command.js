/**
 * @file Defines the Command structure for the Client.
 */
const Discord = require('discord.js');
const Client = require('./Client');

/**
 * Defines a function to help with creating new Commands.
 *
 * @param  {Client} client The Discord Client.
 * @param  {Discord.Message | Discord.Interaction} message A Message or Interaction.
 * @param  {string[]} args An array of strings split from the Message content.
 */
function CommandRunFunction(client, message, args) { } // eslint-disable-line no-empty-function

/**
 * Creates a new Command.
 *
 * @class
 */
class Command {
  /**
   * Defines the requirements to create a Command.
   *
   * @param  {CommandOptions} options Contains useful and necessary information for the Command to run.
   *
   * @typedef {Object} CommandOptions
   * @property {string} name The command name.
   * @property {string} description A brief description of the command.
   * @property {string} dirname The directory the command is in.
   * @property {CommandRunFunction} run The function to be called when the command is run.
   * @property {string} [usage] A broad usage of the command.
   * @property {Array<string>} [examples] An array of practical examples.
   * @property {boolean} [enabled] Whether the command is enabled or not.
   * @property {boolean} [guildOnly] Whether the command is only available in a guild or not.
   * @property {Array<string>} [aliases] An array of possible other names for the command.
   * @property {Array<Discord.PermissionString>} [memberPermissions] An array of necessary permissons the user must have.
   * @property {Array<Discord.PermissionString>} [clientPermissions] An array of necessary permissons the client must have.
   * @property {boolean} [ownerOnly] Whether the command is accessible by the owner only or not.
   * @property {number} [cooldown] The length of time in milliseconds between command calls.
  */
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.usage = options.usage || `!${options.name}`;
    this.examples = options.examples || this.mapAliasesToExamples(options);
    this.dirname = options.dirname || __dirname;
    this.enabled = options.enabled || true;
    this.guildOnly = options.guildOnly || false;
    this.aliases = options.aliases || ['None'];
    this.memberPermissions = options.memberPermissions || ['SEND_MESSAGES'];
    this.clientPermissions = options.clientPermissions || ['SEND_MESSAGES'];
    this.ownerOnly = options.ownerOnly || false;
    this.cooldown = options.cooldown || 3000;
    this.run = options.run;
  }

  /**
   * A function to map aliases to potential examples, if none are present from the
   * Command constructor.
   *
   * @param {CommandOptions} options The options passed to the Command Constructor
   * @returns {Array<string>} An array of examples
   */
  mapAliasesToExamples(options) {
    const examples = [`!${options.name}`];
    try {
      options.aliases.forEach(a => examples.push(`!${a}`));
    }
    catch (err) { } // eslint-disable-line no-empty
    return examples;
  }

  /**
   * A function to print a command in a neat way.
   */
  print() {
    const print = {
      'name': this.name,
      'description': this.description,
      'usage': this.usage,
      'aliases': this.aliases.join(', '),
      'examples': this.examples.join(', '),
      'cooldown': this.cooldown,
    };

    console.log(print);
  }
}


module.exports = Command;