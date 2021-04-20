# ComfyBot

ComfyBot is a multi-purpose, open-source Discord bot with functions ranging from music to ranking, from economy to custom commands.

ComfyBot was developed by @DistroByte#0001 (Discord username)

## Features

### Ranking

ComfyBot has an xp based levelling system that calculates your level for every message sent. Gain a random amount of XP (between 15 and 30) for every message, every 30 seconds!

### Music

ComfyBot has a fully featured music player built into it. Play, pause, skip, shuffle and so much more with the fleet of commands available! You can search by song name or spotify link!

### Fun

Get your fix of entertainment from ComfyBot's fun commands! Ask magic 8 ball a question, predict a name's age, insult someone, play rock, paper, scissors and find all the latest XKCD comics!

### Moderation

With powerul moderation tools, you don't have to worry about people trying to ruin your community, ComfyBot can auto-kick or auto-ban after a number of warnings. ComfyBot can also do giveaways and lockdown an entire server so only moderators can message in.

### General

These are all of your everyday commands. With commands to send reminders, to set an AFK status, to report someone, to suggest something and to see server/member/bot information

## Setting up ComfyBot for yourself

To set ComfyBot up locally, you will need:

- Node.js
- Discord Bot Token
- A MongoDB database

You will also need a file called `config.js` in the bot's root directory.
This file should look like this:
```js
module.exports = {
  token: "xxx", // discord bot token
  prefix: "!", // default bot prefix
  mongoDB: "mongoURL", // mongodb connection string
  dbOptions: { // object containing the mongodb connection options
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "useCreateIndex": true,
    "useFindAndModify": false
  },
  support: { // some ids for servers and channels
    id: "", // the id of your support server, if you have one
    logs: "", // the id of the channel where you want join and leave logs to be sent
  },
  embed: {
    color: "#0091fc", // default embed colour
    footer: "ComfyBot | DistroByte#0001", // default embed footer
  },
  owner: {
    id: "", // your user id
    name: "", // your username/display name
  },
  apiKeys: {
    amethyste: "", // amethyste API key for some image commands
  },
  emojis: {}, // an object of all the emojis you may want to use
  filters: [] // an array of the possible filters for your music player
};
```

# Links

If you want some support for setting the bot up yourself, or want to learn more, do not hesitate to join or contact the following:
- [ComfyBot help server](https://discord.gg/P5qRX8h)
- DistroByte#0001 on discord
- Open an issue on this repository
  
  
  
  
  
  
