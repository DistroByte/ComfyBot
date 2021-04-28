const { Message, GuildMember } = require("discord.js"),
  Member = require("../base/Member"),
  res = require("./responses");

Message.prototype.convertTime = function (time, type, noPrefix) {
  return this.client.convertTime(time, type, noPrefix, (this.guild && this.guild.data) ? this.guild.data.language : null);
};

Message.prototype.error = function (string, options = {}) {
  options.prefixEmoji = "error";
  string = res.error[string] ? res.error[string] : string;
  return this.sendM(string, options);
};

Message.prototype.success = function (string, options = {}) {
  options.prefixEmoji = "success";
  return this.sendM(string, options);
};

Message.prototype.sendM = function (string, options = {}) {
  if (options.prefixEmoji) {
    string = `${this.client.emotes[options.prefixEmoji]} | ${string}`;
  }
  if (options.edit) {
    return this.edit(string);
  } else {
    return this.channel.send(string);
  }
};

GuildMember.prototype.giveMoney = async function (amount) {
  return await Member.findOneAndUpdate({ id: this.id }, { $inc: { money: amount } }, { new: true });
};

GuildMember.prototype.takeMoney = async function (amount) {
  return await Member.findOneAndUpdate({ id: this.id }, { $inc: { money: -amount } }, { new: true });
};