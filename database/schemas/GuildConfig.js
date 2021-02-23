const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  prefix: {
    type: mongoose.SchemaTypes.String,
    required: true,
    default: '!',
  },
  ownerId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  logsChannelId: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  roleReacts: {
    type: mongoose.SchemaTypes.Map,
    required: false,
  },
  guildName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  guildIcon: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  logEditsDeletes: {
    type: mongoose.SchemaTypes.Boolean,
    required: false,
    default: true,
  },
  logLeaves: {
    type: mongoose.SchemaTypes.Boolean,
    required: false,
    default: true,
  },
  levelUp: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: "channel",
  }
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);