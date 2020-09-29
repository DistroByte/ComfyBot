const { Client, Collection } = require("discord.js");
const { token, prefix } = require("./botconfig.json");
const bot = new Client({ partials: ['MESSAGE', 'REACTION'] });

bot.prefix = prefix;
bot.cachedMessageReactions = new Map();
bot.emojiRoleMappings = {};
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);