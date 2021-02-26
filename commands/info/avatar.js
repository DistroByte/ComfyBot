module.exports = {
  config: {
    name: 'avatar',
    aliases: ['icon'],
    usage: '<@user>',
    category: 'info',
    description: 'Returns a jpg of a user\'s avatar',
    accessableby: 'Members',
    permissions: '',
  },
  run: async (client, message, args) => {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
    });

    message.channel.send(avatarList);
  }
}