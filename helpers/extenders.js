const { Guild, Message, MessageEmbed, GuildMember } = require('discord.js');
const Member = require('../base/Member');
const config = require('../config');

Message.prototype.convertTime = function (time, type, noPrefix) {
  return this.client.convertTime(time, type, noPrefix, (this.guild && this.guild.data) ? this.guild.data.language : null);
};

GuildMember.prototype.giveMoney = async function (amount) {
  return await Member.findOneAndUpdate({ id: this.id }, { $inc: { money: amount } }, { new: true })
}

GuildMember.prototype.takeMoney = async function (amount) {
  return await Member.findOneAndUpdate({ id: this.id }, { $inc: { money: -amount } }, { new: true })
}