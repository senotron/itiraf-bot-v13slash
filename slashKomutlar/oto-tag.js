
const { Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const d2b = require("croxydb")
module.exports = {
    name:"oto-tag",
    description: 'Sunucuya giren üyelere otomatik tag verir!',
    type:1,
    options: [
        {
            name:"tag",
            description:"Lütfen bir tag girin!",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has("ManageNickNames")) return interaction.reply({content: "İsimleri Yönet Yetkin Yok!", ephemeral: true})
    const tag = interaction.options.getString('tag')
    d2b.set(`ototag_${interaction.guild.id}`, tag)
    interaction.reply({content: "Başarıyla tagı "+tag+" olarak ayarladım!", ephemeral: true})
}

};