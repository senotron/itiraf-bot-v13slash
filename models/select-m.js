const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  guildId: String,
  roles: Array,
})

module.exports = mongoose.model("reaction-roles", rolesSchema);