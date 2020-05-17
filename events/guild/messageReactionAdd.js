const Store = require('storage-to-json');
let emojiRoleStore = new Store('roleReactions')

module.exports = async (bot, reaction) => {
  let addMemberRole = (emojiRoleMappings) => {
    if (emojiRoleMappings.get(reaction.emoji.id)) {
      let role = reaction.message.guild.roles.cache.get(emojiRoleMappings[reaction.emoji.id]);
      let member = reaction.message.guild.members.cache.get(reaction.message.member.id);
      if (role && member) {
        member.roles.add(role);
      }
    }
  }

  if (reaction.message.partial) {
    await reaction.message.fetch()
    let emojiRoleMappings = await emojiRoleStore.get(reaction.message.id);
    if (emojiRoleMappings) {
      bot.cachedMessageReactions.set(reaction.message.id, emojiRoleMappings);
      addMemberRole(emojiRoleMappings);
    }
  } else {
    let emojiRoleMappings = bot.cachedMessageReactions.get(reaction.message.id);
    if (emojiRoleMappings) {
      addMemberRole(emojiRoleMappings);
    }
  }
}