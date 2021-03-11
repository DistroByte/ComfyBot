const GuildConfig = require('../../database/schemas/GuildConfig');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = async (client, guild) => {
  try {
    const guildConfig = await GuildConfig.deleteOne({
      guildId: guild.id
    });
    const guildLevels = await GuildLevels.deleteOne({
      guildId: guild.id
    });
    console.log("Server removed!", guild.name);
  } catch (err) {
    console.log(err);
  };
}