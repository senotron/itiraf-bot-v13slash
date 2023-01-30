const { Permissions,Client,CommandInteraction,MessageEmbed,MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const model = require("../models/guild");
const klm = require("../models/not");
module.exports = {
  name: "not",
  description: "Not yazarsın",
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
      description: "Sisteme yeni not ekler",
      options:[{name:"not",description:"Not girin",required:true,type:3}]
    },
    {
      type: 1,
      name: "sil",
      description: "Sistemden bir notu siler",
      options:[{name:"not",description:"Silinecek notu girin",required:true,type:3}]
    },
    
    {
      type: 1,
      name: "temizle",
      description: "Sistemdeki sana ait tüm notları siler",
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
    


    const SubCmd = interaction.options.getSubcommand();
    const member = interaction.member;
   const guild = interaction.guild;

    switch(SubCmd){

      case "durum":{
        const durum = interaction.options.get("sistem-durumu").value;
        if(durum === "aktif"){

          await model.updateOne({GuildID:guild.id},{not:true},{upsert:true});
          interaction.reply({ embeds:[new MessageEmbed().setTitle("Not Sistemi Aktif<:aktif:1026089040522518548>").setColor("GREEN").setDescription(`Not Sistemi Yönetici Tarafından aktif edildi.Artık bota eklediğiniz tüm notları bu sunucudada göre bileceksin.\r\n *Notları sizden başka kimse göremez`)] });
        }else if(durum === "pasif"){
          await model.updateOne({GuildID:guild.id},{not:false},{upsert:true});
          interaction.reply({ embeds:[new MessageEmbed().setTitle("Not Sistemi Pasif<:pasif:1026089042208628836>").setColor("RED").setDescription(`Not Sistemi Yönetici Tarafından devre dışı bırakıldı.Artık bota eklediğiniz tüm notları bu sunucuda göre bilmeyeceksin.`)] });
        }
        break;
      }


      case "ekle":{
        let {not} = await model.findOne({GuildID:guild.id});
                if(!not) return interaction.reply({content: `Not Sistemi Bu Sunucuda Aktif Değil.`, ephemeral: true});

        const not2 = interaction.options.getString("not");
        
        await klm.updateOne({MemberId:member.id},{$push:{bKlm:not2}},{upsert:true});
        //Seçenek kısmı
       const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
        .setCustomId("infoselectmenu") 
        .setPlaceholder('Not Listen')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          
          {
            label:"Not Listen(Gizli)" ,
            description:"",
            value:"psychopath",
            emoji:"<:not:1046376931542700083>" 
          },
                    {
            label:"Not Listen(Herkese açık)" ,
            description:"",
            value:"psychopath2",
            emoji:"<:not:1046376931542700083>" 
          },
          ])
        )
        await interaction.reply({content: `\`${not2}\` notu, not listene eklendi<:not:1046376931542700083>`, components: [row],ephemeral: true})
        client.on("interactionCreate", async interaction => {
          if (!interaction.isSelectMenu()) return;
          if(interaction.customId === "infoselectmenu") {
             
   
     if(interaction.values[0] === "psychopath") { //https://psychopath-techonology.ml/
      const embed = new MessageEmbed()
      const d = await klm.findOne({MemberId:member.id})

     const kelimeler = d.bKlm.join("\n")

      await interaction.reply({embeds:[
          {
            title:`Not Listen<:not:1046376931542700083>`,
            description:`${kelimeler}`
          }
        ],ephemeral: true});
    } 
           else if(interaction.values[0] === "psychopath2") { //https://psychopath-techonology.ml/
      const embed = new MessageEmbed()
      const d = await klm.findOne({MemberId:member.id})
     const kelimeler = d.bKlm.join("\n")

      await interaction.reply({embeds:[
          {
            title:`Not Listen<:not:1046376931542700083>`,
            description:`${kelimeler}`
          }
        ],ephemeral: false});
    } 
          }  } ) 
        //https://psychopath-techonology.ml/
        
        
        

        break;

      }
        //Seçenek kısmı

      case "sil":{
        let {not} = await model.findOne({GuildID:guild.id});
                        if(!not) return interaction.reply({content: `Not Sistemi Bu Sunucuda Aktif Değil..`, ephemeral: true});

        const kelime = interaction.options.getString("not");
        const d = await klm.findOne({bKlm:kelime});
        if(!d) return interaction.reply({content: `Bu not zaten eklenmemiş`, ephemeral: true});
        await klm.updateOne({MemberId:member.id},{$pull:{bKlm:kelime}},{upsert:true});
        interaction.reply({embeds:[
          {
            description:`\`${kelime}\` notu, not listenden silindi<:sil:1026088939284598834>`
          }
        ],ephemeral: true});
        break;
      }
        
        


      case "liste":{
        let {not} = await model.findOne({GuildID:guild.id});
                if(!not) return interaction.reply({content: `Not Sistemi Bu Sunucuda Aktif Değil.`, ephemeral: true});   
        const d = await klm.findOne({MemberId:member.id});
        if(!d) return interaction.reply({content: `Sistemde hiç notun yok`, ephemeral: true});
        if(d.bKlm.length <= 0) return interaction.reply({content: `Sistemde hiç notun yok`, ephemeral: true});
        const kelimeler = d.bKlm.join("\n");
        interaction.reply({embeds:[{title:`Not Listen<:not:1046376931542700083>`, description:`\`${kelimeler}\``}]}

);



        
        
        break;
       }
      case "temizle":{
        let {not} = await model.findOne({GuildID:guild.id});
                if(!not) return interaction.reply({content: `Not Sistemi Bu Sunucuda Aktif Değil.`, ephemeral: true});
        await klm.updateOne({MemberId:member.id},{$set:{bKlm:[]}},{upsert:true});
        interaction.reply({embeds:[
          {
            title:`Not Listen Temizlendi`,
            description:`Artık listende hiç not yok`
          }
        ],ephemeral: true});
      }
    }
    
  }
};