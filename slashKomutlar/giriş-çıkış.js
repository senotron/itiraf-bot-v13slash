const {Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");
const model = require("../models/guild");
module.exports = {
    name:"giriş-çıkış",
    description:"Giriş Çıkış Log Ayarları",
    type:1,
    options:[
        {
            name:"ayarla",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"log_kanalı",description:"Giriş Çıkış kanalını ayarlar",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"sıfırla",
            description:"Giriş Çıkış kanalını sıfırlar",
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
                let log_kanalı = interaction.options.getChannel("log_kanalı");
                await model.updateOne({GuildID: interaction.guild.id},{gircikChannel: log_kanalı.id},{upsert:true});
                interaction.reply({embeds:[new MessageEmbed().setTitle("Giriş Çıkış Kanalı Ayarlandı!").setColor("GREEN").setDescription(`Giriş Çıkış sistemi ayarlandı! Giriş Çıkış kanalınız: <#${log_kanalı.id}>`)]});
                break;
            }
            case "sıfırla":{
                await model.updateOne({GuildID: interaction.guild.id},{gircikChannel: null},{upsert:true});
                interaction.reply({embeds:[new MessageEmbed().setTitle("Giriş Çıkış Kanalı Ayarlandı!").setColor("RED").setDescription(`Giriş Çıkış sistemi kapatıldı! Artık sunucunuzda mod-log kanalı yok!`)]});
                break;
            }
        }


    }
}