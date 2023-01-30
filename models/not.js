const mongoose = require("mongoose");

const guildSh = new mongoose.Schema({
    MemberId: String,

      GuildID: String,

    bKlm: [String],
   });
   
   module.exports = mongoose.model("not", guildSh);