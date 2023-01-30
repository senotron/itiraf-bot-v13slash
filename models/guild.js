const mongoose = require("mongoose");

const guildSh = new mongoose.Schema({
    GuildID: String,
    kfrEngel: Boolean,
    lnkEngl: Boolean,
    modlogChannel: String,
    not: Boolean,
    otoyanıt: Boolean,
    kelimeEngl: Boolean,
    gircikChannel: String,
    addChannel: String,
    rmvChannel: String,
    addMsg: String,
    rmvMsg: String,
    ranks: Array,

   });
   
   module.exports = mongoose.model("guild", guildSh);