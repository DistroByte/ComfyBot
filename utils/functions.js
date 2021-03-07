const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { emailUser, emailPass } = require('../botconfig.json')
const { logEvent } = require('./statistics')

module.exports = {
  getMember: function (message, toFind = '') {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members) {
      target = message.mentions.members.first();
    }

    if (!target && toFind) {
      target = message.guild.members.cache.find((member) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) {
      target = message.member;
    }

    return target;
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-GB').format(date);
  },
  compare: function (a, b) {
    if (a.messages < b.messages) {
      return 1;
    }
    if (a.messages > b.messages) {
      return -1;
    }
    return 0;
  },
  sendEmail: function (emailAddress, contents, callback) {
    let transporter = nodemailer.createTransport(smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: `${emailUser}`,
        pass: `${emailPass}`
      }
    }));

    const mailOptions = {
      from: "comfybotemail@gmail.com",
      to: `${emailAddress}`,
      subject: "Verification Code",
      text: `${contents}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        callback(error)
      } else {
        console.log('Email sent: ' + info.response);
        callback(info)
      }
    })
  },
  getLevel: function (xp) {
    return level = Math.floor((((3888 * xp ** 2 + 291600 * xp - 207025) ** (0.5) / (40 * 3 ** (3 / 2)) + ((3 * (3 * xp)) / 5 + 2457 / 4) / 6 - 729 / 8) ** (1 / 3) + 61 / (12 * ((3888 * xp ** 2 + 291600 * xp - 207025) ** (0.5) / (40 * 3 ** (3 / 2)) + ((3 * (3 * xp)) / 5 + 2457 / 4) / 6 - 729 / 8) ** (1 / 3)) - 9 / 2))
  },
  getCommunitiveXp: function (lvl) {
    return communitive = Math.floor(((5 * lvl * lvl * lvl) / 3) + ((45 * lvl * lvl) / 2) + ((455 * lvl) / 6))
  },
  getLevelXp: function (lvl) {
    return levelXp = 5 * Math.floor(lvl / 1) ** 2 + 50 * Math.floor(lvl / 1) + 100
  },
  sendDuplicates: async function (message) {
    message.channel.messages.fetch({ limit: 4 }).then(messages => {
      let values = messages.values()
      let thirdLastMessage = values.next().value
      let secondLastMessage = values.next().value
      let lastMessage = values.next().value
      if (!lastMessage.content || !secondLastMessage.content || !thirdLastMessage.content) return
      if (lastMessage.content === secondLastMessage.content && lastMessage.content === thirdLastMessage.content) {
        message.channel.send(message.content)
      }
    })
  },
  sendLogs: function (client) {
    let textCount = 0
    let voiceCount = 0
    client.channels.cache.forEach(c => {
      if (c.type === "text") {
        textCount += 1
      } else if (c.type === "voice") {
        voiceCount += 1
      }
    })

    let users = 0
    client.guilds.cache.forEach(g => {
      users += g.memberCount
    })
    logEvent(process.memoryUsage().rss, "bot_mem")
    logEvent(client.guilds.cache.size, "guilds")
    logEvent(users, "users")
    logEvent(client.ws.ping, "ping")
    logEvent(textCount, "channels_text")
    logEvent(voiceCount, "channels_voice")
    logEvent(client.channels.cache.size, "all_channels")
    logEvent(client.uptime, "uptime")
    logEvent(client.messageCount, "messages")
    logEvent(client.commandCount, "commands")
    client.commandCount = 0;
    client.messageCount = 0;
  }
};
