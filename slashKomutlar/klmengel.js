const { Permissions,Client,CommandInteraction,MessageEmbed } = require("discord.js");
const model = require("../models/guild");
const klm = require("../models/yasaklıKelime");
module.exports = {
  name: "kelime-engel",
  description: "Sunucuda istemediğiniz kelimleri engeller Engeller",
  type:1,
  options: [
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
      type: 1,
      name: "ekle",
      description: "Sisteme yeni kelime ekler",
      options:[{name:"kelime",description:"Yasaklanıcak Kelimeyi girin",required:true,type:3}]
    },
    {
      type: 1,
      name: "sil",
      description: "Sistemden bir kelimeyi siler",
      options:[{name:"kelime",description:"Yasağı kaldırılacak Kelimeyi girin",required:true,type:3}]
    },
    {
      type: 1,
      name: "liste",
      description: "Sistemdeki tüm yasaklanmış kelimleri gösterir",
      options:[]
    },
    {
      type: 1,
      name: "temizle",
      description: "Sistemdeki tüm yasaklanmış kelimleri siler",
      options:[]
    },
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @returns 
   */
  run: async (client, interaction) => {
    
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});

    const SubCmd = interaction.options.getSubcommand();
    const guild = interaction.guild;
    switch(SubCmd){
      case "durum":{
        const durum = interaction.options.get("sistem-durumu").value;
        if(durum === "aktif"){

          await model.updateOne({GuildID:guild.id},{kelimeEngl:true},{upsert:true});
          interaction.reply({ embeds:[new MessageEmbed().setTitle("Kelime Engelleme Sistemi Aktif<:aktif:1026089040522518548>").setColor("GREEN").setDescription(`Kelime Engelleme Sistemi Yönetici Tarafından aktif edildi artık istemediğiniz kelimeler engellenecek.`)] });
        }else if(durum === "pasif"){
          await model.updateOne({GuildID:guild.id},{kelimeEngl:false},{upsert:true});
          interaction.reply({ embeds:[new MessageEmbed().setTitle("Kelime Engelleme Sistemi Pasif<:pasif:1026089042208628836>").setColor("RED").setDescription(`Kelime Engelleme Sistemi Yönetici Tarafından devre dışı bırakıldı artık istemediğiniz kelimler engelenmeyecek.`)] });
        }
        break;
      }

      case "ekle":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil.`, ephemeral: true});
        const kelime = interaction.options.getString("kelime");
        const d = await klm.findOne({bKlm:kelime});
        if(d) return interaction.reply({content: `Bu kelime zaten ekli`, ephemeral: true});
        await klm.updateOne({GuildID:guild.id},{$push:{bKlm:kelime}},{upsert:true});
        interaction.reply({embeds: [{
          description:`\`${kelime}\` kelimesi, yasaklanan kelimelere eklendi<:true:1025875522393211010>`
        }]});
        break;
      }

      case "sil":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil.`, ephemeral: true});
        const kelime = interaction.options.getString("kelime");
        const d = await klm.findOne({bKlm:kelime});
        if(!d) return interaction.reply({content: `Bu kelime zaten eklenmemiş`, ephemeral: true});
        await klm.updateOne({GuildID:guild.id},{$pull:{bKlm:kelime}},{upsert:true});
        interaction.reply({embeds:[
          {
            description:`\`${kelime}\` kelimesi, yasaklanan kelimerden silindi<:sil:1026088939284598834>`
          }
        ]});
        break;
      }
      case "liste":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil.`, ephemeral: true});
        const d = await klm.findOne({GuildID:guild.id});
        if(!d) return interaction.reply({content: `Sistemde hiç yasaklanmış kelime yok`, ephemeral: true});
        if(d.bKlm.length <= 0) return interaction.reply({content: `Sistemde hiç yasaklanmış kelime yok`, ephemeral: true});
        const kelimeler = d.bKlm.join(", ");
        interaction.reply({embeds:[
          {
            title:`Yasaklı Kelime Listesi`,
            description:`\`${kelimeler}\``
          }
        ]});
        break;
      }
      case "temizle":{
        let {kelimeEngl} = await model.findOne({GuildID:guild.id});
        if(!kelimeEngl) return interaction.reply({content: `Kelime Engelleme Sistemi Aktif Değil.`, ephemeral: true});
        await klm.updateOne({GuildID:guild.id},{$set:{bKlm:[]}},{upsert:true});
        interaction.reply({embeds:[
          {
            title:`Kelime Listesi Temizlendi`,
            description:`Artık sistemde hiç kelime yok`
          }
        ]});
      }
    }
    
  }
};