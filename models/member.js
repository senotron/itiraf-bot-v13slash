const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    MemberId: String,
    GuildID: String,
    uses: Number,
    ayrılan: Number,
    fake: Number,
    bonus: Number,
});

module.exports = mongoose.model("members", ticketSchema);