const { Schema, model } = require("mongoose")

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  komutlar: { type: String, default: "" }
})

module.exports = model("komutlar", schema)