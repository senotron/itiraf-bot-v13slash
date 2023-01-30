const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
 GuildID: String,
 addChannel: String,
 rmvChannel: String,
 addMsg: String,
 rmvMsg: String,
 ranks: Array,
});

module.exports = mongoose.model("davet", ticketSchema);