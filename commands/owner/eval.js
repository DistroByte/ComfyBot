const { inspect } = require('util');
var { MessageEmbed } = require('discord.js');
const GuildLevels = require('../../database/schemas/GuildLevels');
const GuildConfig = require('../../database/schemas/GuildConfig');
const storage = require("storage-to-json");
const fs = require('fs')

module.exports = {
  config: {
    name: 'eval',
    description: 'Evaluates code',
    accessableby: 'owner',
    category: 'owner',
    usage: `<input>`,
    args: true,
    permissions: 'ADMINISTRATOR'
  },
  run: async (client, message, args) => {
    const clean = text => {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }

    let guildConfig = await GuildConfig
    let guildLevels = await GuildLevels
    if (message.author.id === client.ownerId) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  },
};
