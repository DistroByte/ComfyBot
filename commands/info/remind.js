module.exports = {
  config: {
    name: 'remind',
    aliases: ['remind'],
    usage: '<time> <reminder>',
    category: 'Basic',
    description: 'Pings you with a reminder!',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    let joinedMessage = args.join(' ');
    var filteredMessage = joinedMessage.replace(args[0], '');
    function reminder() {
      message.reply("**REMINDER:**\n" + filteredMessage.trim());
    }
    switch (args[0].slice(-1)) {
      case 's': {
        var msDelay = args[0].slice(0, -1) * 1000;
        message.channel.send("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " seconds.");
        setTimeout(reminder, msDelay);
        break;
      }
      case 'm': {
        var msDelay = args[0].slice(0, -1) * 60000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " minutes.");
        setTimeout(reminder, msDelay);
        break;
      }
      case 'h': {
        var msDelay = args[0].slice(0, -1) * 3600000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " hours.");
        setTimeout(reminder, msDelay);
        break;
      }
      case 'd': {
        var msDelay = args[0].slice(0, -1) * 86400000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " days.");
        setTimeout(reminder, msDelay);
        break;
      }
    }
  }
}

