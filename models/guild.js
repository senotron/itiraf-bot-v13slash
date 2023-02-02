const mongoose = require("mongoose");

const guildSh = new mongoose.Schema({
    GuildID: String,

    itirafChannel: String,
    itirafadminChannel: String,


   });
   
   module.exports = mongoose.model("guild", guildSh);