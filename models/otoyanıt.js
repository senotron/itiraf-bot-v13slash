const mongoose = require("mongoose");

const guildSh = new mongoose.Schema({
    MemberId: String,
    GuildID: String,
    msg: [String],
    omsg: [String],

   });
   
   module.exports = mongoose.model("otoyanıt", guildSh);