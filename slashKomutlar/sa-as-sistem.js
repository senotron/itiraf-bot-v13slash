const { Client,MessageEmbed } = require("discord.js");
const d2b = require("croxydb")
module.exports = {
  name: "sa-as",
  description: "Selam Sistemini Açıp Kapatırsın!",
  type: 1,
  options: [{
      type: 1,
      name: "durum",
      description: "Sistemin Aktif/Pasif Durumunu Ayarlar",
      options:[{
        name:"sistem-durumu", required:true,
        description: "Sistem Durunu ayarlarsınız",type:3,
        choices:[{name:"Aktif",value:"aktif"},{name:"Pasif",value:"pasif"}]
      }]
    }],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has("ManageRoles")) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    
    
    
      
    const embed = new MessageEmbed()
    .setDescription("✅ **Sistem Kapatıldı** \n Artık Bot Selamı Almayacak.")
    const embed2 = new MessageEmbed()
   .setDescription("✅ **Sistem Açıldı** \n Artık Bot Selamı Alıcak.")
 
    
      const SubCmd = interaction.options.getSubcommand();
    const member = interaction.member;
   const guild = interaction.guild;

    switch(SubCmd){  
    
    case "durum":{
        const durum = interaction.options.get("sistem-durumu").value;
        if(durum === "aktif"){
     d2b.set(`saas_${interaction.guild.id}`, true);
    interaction.reply({embeds: [embed2], allowedMentions: { repliedUser: false }})
 
        }else if(durum === "pasif"){
 
     d2b.delete(`saas_${interaction.guild.id}`);
     interaction.reply({embeds: [embed], allowedMentions: { repliedUser: false }})        }
        break;
      }
    
    
    
    
  
 
 
 
  }

  }

};