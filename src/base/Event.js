/**
 * @file Specifies a new Event class that allows the Client to run events.
 */
const Discord = require('discord.js');
const Client = require('./Client.js');

/**
 * Defines a function to help with creating new events.
 *
 * @template {keyof Discord.ClientEvents} K
 * @param  {Client} client The Discord Client
 * @param  {Discord.ClientEvents[K]} eventArgs Any extra information or data to be passed to the Event.
 */
function EventRunFunction(client, ...eventArgs) { } // eslint-disable-line no-empty-function

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
  /**
   * Creates an event.
   *
   * @typedef {Object}
   * @param  {K} event The Event name.
   * @param  {EventRunFunction<K>} runFunction The function that is triggered when the Event is called.
   */
  constructor(event, runFunction) {
    this.event = event;
    this.run = runFunction;
  }
}

module.exports = Event;