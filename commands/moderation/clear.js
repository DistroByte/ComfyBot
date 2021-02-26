module.exports = {
  config: {
    name: 'clear',
    description: 'Clears x number of messages',
    usage: '<number>',
    category: 'moderation',
    accessableby: 'Moderators',
    permissions: 'MANAGE_MESSAGES',
    args: true
  },
  run: async (client, message, args) => {
    message.delete();

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply("I can't delete 0 messages!")
    }

    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
      return message.reply("I can't delete messages!")
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]);
    }

    message.channel
      .bulkDelete(deleteAmount, true)
      .then((deleted) =>
        message.channel.send(`I deleted \`${deleted.size}\` messages.`)
      )
      .catch((err) => message.reply(`Something went wrong... ${err}`));
  },
};
