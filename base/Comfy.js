const { Client, Collection } = require("discord.js"),
  { GiveawaysManager } = require("discord-giveaways"),
  { Player } = require("discord-player"),
  Sentry = require("@sentry/node"),
  util = require("util"),
  path = require("path"),
  AmeClient = require("amethyste-api"),
  moment = require("moment");
// all basic imorts

class Comfy extends Client {
  constructor(options) {
    super(options);
    this.config = require("../config"); // gets config file and loads it to memory
    this.emotes = this.config.emojis; // loads emojis

    this.commands = new Collection(); // creates a new collection for commands
    this.aliases = new Collection(); // creates a new collection for aliases

    this.logger = require("../helpers/logger"); // loads the logger function
    this.functions = require("../helpers/functions"); // loads the functions file
    this.wait = util.promisify(setTimeout); // adds a 1s timeout

    this.guildsData = require("./Guild"); // loads guild schema
    this.usersData = require("./User"); // loads user schema
    this.membersData = require("./Member"); // loads member schema
    this.logs = require("./Log"); // loads logs schema

    this.queues = new Collection(); // creates a collection for music player

    this.dashboard = require("../dashboard/app"); // requires in the dashboard
    this.states = {}; // adds an object for states

    this.knownGuilds = []; // creates a known guilds array

    this.databaseCache = {}; // starts database cache
    this.databaseCache.users = new Collection();
    this.databaseCache.guilds = new Collection();
    this.databaseCache.members = new Collection();
    this.databaseCache.usersReminds = new Collection();
    this.databaseCache.mutedUsers = new Collection(); // creates collections for all of the above

    this.authCodes = new Map(); // creates a new map of auth codes

    Sentry.init({
      dsn: this.config.apiKeys.sentry,
      tracesSampleRate: 1.0,
    });
    // creates a new sentry to monitor the bot for errors

    this.AmeAPI = new AmeClient(this.config.apiKeys.amethyste); // loads amethyste API

    this.player = new Player(this, { leaveOnEmpty: true, leaveOnEnd: true, leaveOnEndCooldown: 12000, leaveOnStop: true, leaveOnEmptyCooldown: 12000 }); // creates player
    this.filters = this.config.filters; // loads filters
    this.player
      .on("trackStart", (message, track) => { // on new track start
        let messages = message.channel.messages.cache.filter(msg => msg.author.id === this.user.id && msg.content.includes("Now playing")); // finds old track start messages
        let musicMessage = messages.last(); // gets last one
        if (musicMessage) musicMessage.delete(); // deletes it

        message.channel.send(`${this.emotes?.music} - Now playing \`${track.title}\` into \`${message.member.voice.channel.name}\``); // sends new one
      })
      .on("searchResults", (message, query, tracks) => { // when a query returns
        if (tracks.length > 20) tracks = tracks.slice(0, 20); // if the res is longer than 20 items, slice it
        message.channel.send({
          embed: {
            color: "BLUE",
            author: { name: `Here are your search results for ${query}` },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join("\n")}`,
          },
        });
      })
      .on("searchInvalidResponse", (message, query, tracks, content, collector) => {
        if (content === "cancel") {
          collector.stop();
          return message.channel.send(`${this.emotes?.success} - The selection has been **cancelled**!`);
        } else message.channel.send(`${this.emotes?.error} - You must send a valid number between **1** and **${tracks.length}**!`);

      })
      .on("searchCancel", (message) => {
        message.channel.send(`${this.emotes?.error} - You did not provide a valid response. Please send the command again!`);
      })
      .on("botDisconnect", (message) => {
        message.channel.send(`${this.emotes?.error} - Music stopped as I have been disconnected from the channel!`);
      })
      .on("noResults", (message) => {
        message.channel.send(`${this.emotes?.error} - No results found on YouTube for ${message.content.split().slice(1).join(" ")}!`);
      })
      .on("queueEnd", (message) => {
        message.channel.send(`${this.emotes?.error} - No more music in the queue!`);
      })
      .on("playlistAdd", (message, queue, playlist) => {
        message.channel.send(`${this.emotes?.music} - ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs)!`);
      })
      .on("trackAdd", (message, queue, track) => {
        message.channel.send(`${this.emotes?.music} - ${track.title} has been added to the queue!`);
      })
      .on("channelEmpty", (message) => {
        message.channel.send(`${this.client.emotes?.error} - Music stopped as there is no more member in the voice channel!`);
      })
      .on("error", (message, error) => { // general errors
        switch (error) {
          case "NotPlaying":
            message.channel.send(`${this.emotes?.error} - There is no music being played on this server!`);
            break;
          case "NotConnected":
            message.channel.send(`${this.emotes?.error} - You are not connected in any voice channel!`);
            break;
          case "UnableToJoin":
            message.channel.send(`${this.emotes?.error} - I am not able to join your voice channel, please check my permissions!`);
            break;
          case "VideoUnavailable":
            message.channel.send(`${this.emotes?.error} - ${message.content.split()[0].title} is not available in your country! Skipping!`);
            break;
          case "MusicStarting":
            message.channel.send("The music is starting! please wait and retry!");
            break;
          default:
            message.channel.send(`${this.emotes?.error} - Something went wrong. Error: ${error}`);
        }
      });

    this.giveawaysManager = new GiveawaysManager(this, { // manager for giveaways
      storage: "./giveaways.json",
      updateCountdownEvery: 10000,
      default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
      }
    });
  }

  // from here down is some useful functions

  printDate(date) { // print the date
    return moment(new Date(date))
      .locale("UTC")
      .format("hh:mm a, DD-MM-YYYY");
  }

  loadCommand(commandPath, commandName) { // load a command
    try {
      const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this); // gets properties
      props.conf.location = commandPath; // finds location
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props); // adds command to commands collection
      props.help.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name); // adds command to alias collection
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }

  async unloadCommand(commandPath, commandName) { // unload a command
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) {
      return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
    }
    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }

  async findOrCreateGuild({ id: guildID }, isLean) { // useful for always returning a guild
    if (this.databaseCache.guilds.get(guildID)) { // if one exists
      return isLean ? this.databaseCache.guilds.get(guildID).toJSON() : this.databaseCache.guilds.get(guildID); // and if its lean then get full one
    } else {
      let guildData = (isLean ? await this.guildsData.findOne({ id: guildID }).populate("members").lean() : await this.guildsData.findOne({ id: guildID }).populate("members")); // fill database up with members
      if (guildData) {
        if (!isLean) this.databaseCache.guilds.set(guildID, guildData);
        return guildData;
      } else {
        guildData = new this.guildsData({ id: guildID });
        await guildData.save();
        this.databaseCache.guilds.set(guildID, guildData);
        return isLean ? guildData.toJSON() : guildData;
      }
    }
  }

  async findOrCreateMember({ id: memberID, guildID }, isLean) { // same as above, but for members
    if (this.databaseCache.members.get(`${memberID}${guildID}`)) {
      return isLean ? this.databaseCache.members.get(`${memberID}${guildID}`).toJSON() : this.databaseCache.members.get(`${memberID}${guildID}`);
    } else {
      let memberData = (isLean ? await this.membersData.findOne({ guildID, id: memberID }).lean() : await this.membersData.findOne({ guildID, id: memberID }));
      if (memberData) {
        if (!isLean) this.databaseCache.members.set(`${memberID}${guildID}`, memberData);
        return memberData;
      } else {
        memberData = new this.membersData({ id: memberID, guildID: guildID });
        await memberData.save();
        const guild = await this.findOrCreateGuild({ id: guildID });
        if (guild) {
          guild.members.push(memberData._id);
          await guild.save();
        }
        this.databaseCache.members.set(`${memberID}${guildID}`, memberData);
        return isLean ? memberData.toJSON() : memberData;
      }
    }
  }

  async findOrCreateUser({ id: userID }, isLean) { // same as above but with users
    if (this.databaseCache.users.get(userID)) {
      return isLean ? this.databaseCache.users.get(userID).toJSON() : this.databaseCache.users.get(userID);
    } else {
      let userData = (isLean ? await this.usersData.findOne({ id: userID }).lean() : await this.usersData.findOne({ id: userID }));
      if (userData) {
        if (!isLean) this.databaseCache.users.set(userID, userData);
        return userData;
      } else {
        userData = new this.usersData({ id: userID });
        await userData.save();
        this.databaseCache.users.set(userID, userData);
        return isLean ? userData.toJSON() : userData;
      }
    }
  }

  convertTime(time, type, noPrefix) { // converts time
    if (!type) time = "to";
    const m = moment(time).locale("UTC");
    return (type === "to" ? m.toNow(noPrefix) : m.fromNow(noPrefix));
  }

  async resolveUser(search) { // finds a user
    let user = null;
    if (!search || typeof search !== "string") return;
    // Try ID search
    if (search.match(/^<@!?(\d+)>$/)) {
      const id = search.match(/^<@!?(\d+)>$/)[1];
      user = this.users.fetch(id).catch(() => { });
      if (user) return user;
    }
    // Try tag search
    if (search.match(/^!?(\w+)#(\d+)$/)) {
      const username = search.match(/^!?(\w+)#(\d+)$/)[0];
      const discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
      user = this.users.cache.find((u) => u.username === username && u.discriminator === discriminator);
      if (user) return user;
    }
    // try username search
    if (search.match(/^!?(\w+)$/)) {
      user = this.users.cache.find((u) => u.username.toLowerCase() === search.toLowerCase());
      if (user) return user;
    }
    user = await this.users.fetch(search).catch(() => { });
    return user;
  }

  async resolveMember(search, guild) { // finds a member
    let member = null;
    if (!search || typeof search !== "string") return;
    // Try ID search
    if (search.match(/^<@!?(\d+)>$/)) {
      const id = search.match(/^<@!?(\d+)>$/)[1];
      member = await guild.members.fetch(id).catch(() => { });
      if (member) return member;
    }
    // Try username search
    if (search.match(/^!?(\w+)/)) {
      guild = await guild.fetch();
      member = guild.members.cache.find((m) => (m.user.tag.toLowerCase() === search || m.user.username.toLowerCase() === search));
      if (member) return member;
    }
    member = await guild.members.fetch(search).catch(() => { });
    return member;
  }

  async resolveRole(search, guild) { // finds a role
    let role = null;
    if (!search || typeof search !== "string") return;
    // Try ID search
    if (search.match(/^<@&!?(\d+)>$/)) {
      const id = search.match(/^<@&!?(\d+)>$/)[1];
      role = guild.roles.cache.get(id);
      if (role) return role;
    }
    // Try name search
    role = guild.roles.cache.find((r) => search === r.name);
    if (role) return role;
    role = guild.roles.cache.get(search);
    return role;
  }

  bar(used, free) { // generates a fancy bar for ram usage
    const full = "▰";
    const empty = "▱";
    const total = used + free;
    used = Math.round((used / total) * 10);
    free = Math.round((free / total) * 10);
    return full.repeat(used) + empty.repeat(free);
  }

  match(msg, i) { // find a user or displayname from a string
    if (!msg) return undefined;
    if (!i) return undefined;
    let user = i.members.cache.find(
      m =>
        m.user.username.toLowerCase().startsWith(msg) ||
        m.user.username.toLowerCase() === msg ||
        m.user.username.toLowerCase().includes(msg) ||
        m.displayName.toLowerCase().startsWith(msg) ||
        m.displayName.toLowerCase() === msg ||
        m.displayName.toLowerCase().includes(msg)
    );
    if (!user) return undefined;
    return user.user;
  }
}

module.exports = Comfy;
