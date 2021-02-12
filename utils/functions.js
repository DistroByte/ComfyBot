const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { emailUser, emailPass } = require('../botconfig.json')

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
  }
};
