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
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);