const {Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");
const model = require("../models/guild");
module.exports = {
    name:"itiraf-kanal",
    description:"İtiraf Ayarları",
    type:1,
    options:[
        {
            name:"ayarla",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"itiraf_kanalı",description:"Mod-Log kanalını ayarlar",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"sıfırla",
            description:"Mod log kanalını sıfırlar",
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
        {
         // interaction.deferReply();
          interaction.reply({content:"Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!",ephemeral:true});
          return;
        }
        let SubCmd = interaction.options.getSubcommand();
       // interaction.deferReply();
        switch(SubCmd){
            case "ayarla":{
                let itiraf_kanalı = interaction.options.getChannel("itiraf_kanalı");
                await model.updateOne({GuildID: interaction.guild.id},{modlogChannel: itiraf_kanalı.id},{upsert:true});
                interaction.reply({embeds:[new MessageEmbed().setTitle("Mod-Log Kanalı Ayarlandı!").setColor("GREEN").setDescription(`İtiraf sistemi ayarlandı! İtiraf kanalınız: <#${itiraf_kanalı.id}>`)]});
                break;
            }
            case "sıfırla":{
                await model.updateOne({GuildID: interaction.guild.id},{modlogChannel: null},{upsert:true});
                interaction.reply({embeds:[new MessageEmbed().setTitle("Mod-Log Kanalı Ayarlandı!").setColor("RED").setDescription(`Mod-Log sistemi kapatıldı! Artık sunucunuzda mod-log kanalı yok!`)]});
                break;
            }
        }


    }
}