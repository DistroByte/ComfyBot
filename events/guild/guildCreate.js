const GuildConfig = require('../../database/schemas/GuildConfig');
const GuildLevels = require('../../database/schemas/GuildLevels');

module.exports = async (client, guild) => {
  try {
    const guildConfig = await GuildConfig.create({
      guildId: guild.id,
      ownerId: guild.ownerID
    });
    const guildLevels = await GuildLevels.create({
      guildId: guild.id,
      memberXp: {}
    });
    console.log("New server added!", guild.name);
  } catch (err) {
    console.log(err);
  };
}

