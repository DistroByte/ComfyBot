const Store = require('storage-to-json');
let emojiRoleStore = new Store('roleReactions')

module.exports = async (client, reaction, user) => {
  let addMemberRole = (emojiRoleMappings) => {
    if (emojiRoleMappings[reaction.emoji.id]) {
      let role = reaction.message.guild.roles.cache.get(emojiRoleMappings[reaction.emoji.id]);
      let member = reaction.message.channel.guild.members.cache.get(user.id);
      if (role && member) {
        member.roles.add(role);
      }
    }
  }

  if (reaction.message.partial) {
    await reaction.message.fetch()
    let emojiRoleMappings = await emojiRoleStore.get(reaction.message.id);
    if (emojiRoleMappings) {
      client.cachedMessageReactions.set(reaction.message.id, emojiRoleMappings);
      addMemberRole(emojiRoleMappings);
    }
  } else {
    let emojiRoleMappings = client.cachedMessageReactions.get(reaction.message.id);
    if (emojiRoleMappings) {
      addMemberRole(emojiRoleMappings);
    }
  }
}
