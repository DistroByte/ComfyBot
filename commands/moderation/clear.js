module.exports = {
  config: {
    name: 'clear',
    description: 'Clears x number of messages',
    usage: '<number>',
    category: 'moderation',
    accessableby: 'Moderators',
  },
  run: async (bot, message, args) => {
    message.delete();

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message
        .reply("You can't delete messages!")
        .then((m) => m.delete({ timeout: 5000 }));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message
        .reply(
          "I can't delete 0 messages!"
        )
        .then((m) => m.delete({ timeout: 5000 }));
    }

    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
      return message
        .reply("I can't delete messages!")
        .then((m) => m.delete({ timeout: 5000 }));
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
