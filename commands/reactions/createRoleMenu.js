const { MessageCollector } = require('discord.js')
const Store = require('storage-to-json');
let emojiRoleStore = new Store('roleReactions')

let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports = {
  config: {
    name: 'createrolemenu',
    usage: '<id>',
    category: 'reactions',
    description: 'Enables the bot to add roles via reactions. Type done when finished',
    accessableby: 'Admins',
    permissions: 'MANAGE_ROLES',
    args: true
  },
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send('Please include a message ID!')
    } else {
      try {
        let fetchedMessage = await message.channel.messages.fetch(args[0])
        let obj = {}
        if (fetchedMessage) {
          await message.channel.send('Please provide all of the emoji names with the role name, in separate messages, separated by a comma e.g.\n<emojiname>, <rolename>')
          let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));

          collector.on('collect', msg => {
            let { cache } = msg.guild.emojis;
            if (msg.content.toLowerCase() === `done`) return collector.stop('done command was issued');


            let [emojiName, roleName] = msg.content.split(/,\s+/);
            if (!emojiName && !roleName) return;
            let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
            if (!emoji) return msg.channel.send('Emoji does not exist')

            let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (!role) return msg.channel.send('Role does not exist. Try again.')

            fetchedMessage.react(emoji).catch(err => console.log(err))
            var e = emoji.id
            obj[e] = role.id
          });


          collector.on('end', (collected, reason) => {
            if (emojiRoleStore.get(fetchedMessage.id)) {
              message.channel.send('A role reaction for this message exists already!')
            } else {
              emojiRoleStore.set(fetchedMessage.id, obj)
              message.channel.send('Success!')
            }
          });
        }
      } catch (err) {
        console.log(err);
        message.channel.send('Message was not found!')
      };
    }
  }
}
