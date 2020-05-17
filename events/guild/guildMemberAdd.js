const Store = require('storage-to-json');
const guildData = new Store('guildData')

module.exports = async (client, member) => {
  let guildId = member.guild.id
  let fetchedGuildId = guildData.get(guildId)
  if (fetchedGuildId) {
    if (fetchedGuildId.hasOwnProperty(defaultChannel)) {
      let channel = await member.guild.channels.get(fetchedGuildId.defaultChannel)
      channel.send(`Welcome to the server ${member.username}`)
    }
  } else {

  }
}