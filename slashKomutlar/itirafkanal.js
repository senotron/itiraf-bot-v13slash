const {Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");
const model = require("../models/guild");
module.exports = {
    name:"itiraf-kanal",
    description:"İtiraf Ayarları",
    type:1,
    options:[
      {
      type: 1,
      name: "durum",
      description: "Sistemin Aktif/Pasif Durumunu Ayarlar",
      options:[{
        name:"sistem-durumu", required:true,
        description: "Sistem Durunu ayarlarsınız",type:3,
        choices:[{name:"Aktif",value:"aktif"},{name:"Pasif",value:"pasif"}]
      }]
    },
        {
            name:"ayarla",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"itiraf_kanalı",description:"Mod-Log kanalını ayarlar",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"sıfırla",
            description:"İtiraf kanalını sıfırlar",
            type:1            
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
         const guild = interaction.guild;

        if(!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        {
         // interaction.deferReply();
          interaction.reply({content:"Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!",ephemeral:true});
          return;
        }
        let SubCmd = interaction.options.getSubcommand();
       // interaction.deferReply();
        switch(SubCmd){
             case "durum":{
        const durum = interaction.options.get("sistem-durumu").value;
        if(durum === "aktif"){

          await model.updateOne({GuildID:guild.id},{itiraf:true},{upsert:true});
          interaction.reply({ embeds:[new MessageEmbed().setTitle("Not Sistemi Aktif<:aktif:1026089040522518548>").setColor("GREEN").setDescription(`İtiraf Sistemi Yönetici Tarafından aktif edildi.Artık bota eklediğiniz tüm notları bu sunucudada göre bileceksin.\r\n *Notları sizden başka kimse göremez`)] });
        }else if(durum === "pasif"){
          await model.updateOne({GuildID:guild.id},{itiraf:false},{upsert:true});
          interaction.reply({ embeds:[new MessageEmbed().setTitle("İtiraf Sistemi Pasif<:pasif:1026089042208628836>").setColor("RED").setDescription(`İtiraf Yönetici Tarafından devre dışı bırakıldı.Artık bota eklediğiniz tüm notları bu sunucuda göre bilmeyeceksin.`)] });
        }
        break;
      }
            case "ayarla":{
                let itiraf_kanalı = interaction.options.getChannel("itiraf_kanalı");
                await model.updateOne({GuildID: interaction.guild.id},{itirafChannel: itiraf_kanalı.id},{upsert:true});
                interaction.reply({embeds:[new MessageEmbed().setTitle("Mod-Log Kanalı Ayarlandı!").setColor("GREEN").setDescription(`İtiraf kanalı ayarlandı! İtiraf kanalınız: <#${itiraf_kanalı.id}>`)]});
                break;
            }
            case "sıfırla":{
                await model.updateOne({GuildID: interaction.guild.id},{itirafChannel: null},{upsert:true});
                interaction.reply({embeds:[new MessageEmbed().setTitle("Mod-Log Kanalı Ayarlandı!").setColor("RED").setDescription(`Mod-Log sistemi kapatıldı! Artık sunucunuzda mod-log kanalı yok!`)]});
                break;
            }
        }


    }
}