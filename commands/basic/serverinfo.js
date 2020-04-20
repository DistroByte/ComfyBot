const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "serverinfo",
    description: "Pulls the serverinfo of the guild!",
    usage: "(command)",
    category: "miscellaneous",
    aliases: ["si", "serverdesc"],
  },
  run: async (bot, message, args) => {
    let sEmbed = new RichEmbed()
      .setColor("GREEN")
      .setTitle("Server Info")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField("**Guild Name:**", `${message.guild.name}`, true)
      .addField("**Guild Owner:**", `${message.guild.owner}`, true)
      .addField("**Member Count:**", `${message.guild.memberCount}`, true)
      .addField("**Role Count:**", `${message.guild.roles.size}`, true)
      .addField("**Channel Count:**", `${message.guild.channels.size}`, true)
      .setFooter(
        `ComfyBot | Developed by JammyGamer`,
        bot.user.displayAvatarURL
      );
    message.channel.send(sEmbed);
  },
};
