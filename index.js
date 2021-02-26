const { Client, Collection } = require("discord.js");
const { token, url, dbOptions, ownerid } = require("./botconfig.json");
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const mongoose = require('mongoose');

mongoose.connect(url, dbOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log("Connected to DB"); });

client.authCodes = new Map();
client.talkedRecently = new Set();
client.cachedMessageReactions = new Map();
client.emojiRoleMappings = {};
client.ownerId = ownerid;
["commands", "aliases"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(token);