const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client({ partials: ['MESSAGE', 'REACTION'] });

bot.prefix = "!";
bot.cachedMessageReactions = new Map();
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["command", "consolechatter", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);