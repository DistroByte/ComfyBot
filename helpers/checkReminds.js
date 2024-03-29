const Discord = require("discord.js");

module.exports = {
  // checks reminders of each user every second
  init(client) {
    client.usersData.find({ reminds: { $gt: [] } }).then(users => {
      for (const user of users) {
        if (!client.users.cache.has(user.id)) client.users.fetch(user.id);
        client.databaseCache.usersReminds.set(user.id, user);
      }
    });

    setInterval(async function () {
      const dateNow = Date.now();
      client.databaseCache.usersReminds.forEach(async user => {
        const dUser = client.users.cache.get(user.id);
        if (dUser) {
          const reminds = user.reminds,
            mustSend = reminds.filter(r => r.sendAt < dateNow);
          if (mustSend.length > 0) {
            mustSend.forEach(reminder => {
              const embed = new Discord.MessageEmbed()
                .setAuthor("ComfyBot Reminder")
                .addField("Created", `Message created ${client.convertTime(reminder.createdAt, "from")}`)
                .addField("Message", reminder.message)
                .addField("Message link", `[Click here](${reminder.messageURL})`)
                .setColor(client.config.embed.color)
                .setFooter(client.config.embed.footer);
              dUser.send(embed);
            });
            user.reminds = user.reminds.filter(r => r.sendAt >= dateNow);
            user.save();
            if (user.reminds.length === 0) client.databaseCache.usersReminds.delete(user.id);
          }
        }
      });
    }, 1000);
  }
};