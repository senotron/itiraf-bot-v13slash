const { Client,  MessageEmbed } = require("discord.js");
const d2b = require("croxydb")
module.exports = {
  name: "afk",
  description: "Afk Olursun!",
  type: 1,
  options: [
    {
        name:"sebep",
        description:"Afk Olma Sebebini Gir!",
        type:3,
        required:true
    },
  ],

  run: async(client, interaction) => {
    const sebep = interaction.options.getString('sebep')
    const user = interaction.member;
    let uye =  interaction.member;
    let nick = uye.displayName;

 interaction.member.setNickname(`[AFK] ` + nick);
    d2b.set(`afk_${interaction.user.id}`, sebep);
    d2b.set(`nick_${interaction.member.id}_${interaction.guild.id}`, nick);
    d2b.set(`afktime_${interaction.guild.id}`,Date.now());

    interaction.reply("Başarıyla Afk Oldun!")

     

  }

};