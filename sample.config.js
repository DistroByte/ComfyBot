module.exports = {
  token: "", // bot token
  prefix: "!", // default prefix
  inviteURL: "https://discord.com/api/oauth2/authorize?client_id=666393146351026176&permissions=8&scope=bot", // bot invite link
  supportURL: "https://discord.gg/P5qRX8h", // support invite link
  mongoDB: "", // mongodb connection uri
  dbOptions: { // database options
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "useCreateIndex": true,
    "useFindAndModify": false
  },
  support: {
    id: "762742746405535774", // id of support server
    logs: "790439982288076800", // id of channel to send bot joins/leaves
  },
  embed: {
    color: "#0091fc", // default embed colour
    footer: "ComfyBot | DistroByte#0001" // default embed footer
  },
  owner: {
    id: "180375991133143040", // owner id
    name: "DistroByte#0001" // owner display name
  },
  others: {
    github: "https://github.com/DistroByte", // link to github
    donate: "https://www.patreon.com/distrobyte" // link to patreon/donate
  },
  apiKeys: {
    sentry: "", // node sentry api key
    amethyste: "", // amethyste api key
  },
  emojis: {
    "off": ":x:",
    "success": "<:tick:821873784163270676>",
    "error": "<:error:821875179281186826>",
    "loading": "<:loading:834256473193447455>",
    "queue": ":bar_chart:",
    "music": ":musical_note:",
    "Administration": "<:ComfyBotAdmin:820155819340988479>",
    "Fun": "<:ComfyBotFun:820159633637113857>",
    "General": "<:ComfyBotGeneral:820161735625277490>",
    "Owner": "<:ComfyBotOwner:820162019356704808>",
    "Music": "<:ComfyBotMusic:820162002206851112>",
    "Moderation": "<:ComfyBotModeration:820161987086385182>",
    "Images": "<:ComfyBotImages:820161963316346881>",
    "Economy": "<:ComfyBotEconomy:820162036969111572>",
    "Ranking": "<:ComfyBotRanking:820162690479685643>",
    "Reactions": "<:ComfyBotReactions:820162892493225994>",
    "DMCommands": ":e_mail:",
    "status": {
      "dnd": "<:atlanta_dnd:616613445252546570>",
      "idle": "<:atlanta_idle:616613445290164224>",
      "online": "<:atlanta_online:616613445424513028>",
      "offline": "<:atlanta_offline:616613445487558696>"
    },
  },
  filters: [
    "8D",
    "gate",
    "haas",
    "phaser",
    "treble",
    "tremolo",
    "vibrato",
    "reverse",
    "karaoke",
    "flanger",
    "mcompand",
    "pulsator",
    "subboost",
    "bassboost",
    "vaporwave",
    "nightcore",
    "normalizer",
    "surrounding"
  ],
};