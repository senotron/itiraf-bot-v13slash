const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  GuildID: String,
  confessionSystem: Boolean,
  confessionChannel: String,
  confessionAdminChannel: String,
});

module.exports = mongoose.model("Guild", guildSchema);
