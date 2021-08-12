/**
 * @file Initiates the Client from the modified discord.js Client class.
 * Quite a simple file, does not need to be complicated.
 */
console.clear();

(new (require('./base/Client'))).start();
