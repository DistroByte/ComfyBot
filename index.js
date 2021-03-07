const { sendLogs } = require("./utils/functions");
const { Client, Collection } = require("discord.js");
const { token, url, dbOptions, ownerid } = require("./botconfig.json");
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });

const mongoose = require('mongoose');
mongoose.connect(url, dbOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log("Connected to DB"); });

client.talkedRecently = new Set();
client.emojiRoleMappings = {};
client.ownerId = ownerid;
client.messageCount = 0;
client.commandCount = 0;

["authCodes", "cachedMessageReactions"].forEach(x => client[x] = new Map());
["commands", "aliases"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(token);

setInterval(function () {
  sendLogs(client)
}, 30 * 1000)