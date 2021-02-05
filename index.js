const { Client, Collection } = require("discord.js");
const { token, url, dbOptions } = require("./botconfig.json");
const bot = new Client({ partials: ['MESSAGE', 'REACTION'] });
const mongoose = require('mongoose');

mongoose.connect(url, dbOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log("Connected to DB"); });

bot.talkedRecently = new Set();
bot.cachedMessageReactions = new Map();
bot.emojiRoleMappings = {};
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);