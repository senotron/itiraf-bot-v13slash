const { MessageEmbed,Client,CommandInteraction,Permissions } = require("discord.js");
const model = require("../models/ban")
module.exports = {
    name:"ban-sistem",
    description: 'Ban sistemini ayarlar',
    type:1,
    options:[
        {
          name:"ayarla",description:"Ban sistemi ayarlar",type:1,options:[
            {
                name:"rol",
                description:"Ban Yetilisi Rolü (UNUTMA! Bu role sahip kişiler üyeleri yasakla yetkisine sahip olucak!)",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"sıfırla",
            description:"Ban sistemi sıfırlar",
            type:1
        }
        
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {  

        if(!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        return interaction.reply({content:"Bu komutu kullanmak için yetkin yok<:cross:999958697310695504>",ephemeral:true})

        let durum = interaction.options.getSubcommand();

        if(durum == "ayarla"){
            let rol = interaction.options.getRole("rol");
            const { roleID,BanSystem } = await model.findOne({ guildID: interaction.guild.id }) || { roleID: null };
             await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { roleID: rol.id, BanSystem:true } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Ban sistemi başarıyla ayarlandı<:true:1025875522393211010>"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Ban sistemi ayarlanırken bir hata oluştu<:cross:999958697310695504>"})
             })
             return;
        }
        else if(durum == "sıfırla"){
            const { BanSystem } = await model.findOne({ guildID: interaction.guild.id }) || { BanSystem: false };
            if (!BanSystem) return interaction.reply({content:"Ban sistemi zaten kapalı",ephemeral:true});

            await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { BanSystem:false, roleID: null } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Ban sistemi başarıyla kapatıldı<:true:1025875522393211010>"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Ban sistemi ayarlanırken bir hata oluştu<:cross:999958697310695504>"})
             })

             return;
        }
       
        
}
};