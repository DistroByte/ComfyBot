const mongoose = require('mongoose');

const GuildLevelsSchema = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  memberXp: {
    type: mongoose.SchemaTypes.Map,
    required: false,
  },
});

module.exports = mongoose.model('GuildLevels', GuildLevelsSchema);