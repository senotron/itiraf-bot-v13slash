const {MessageEmbed} = require("discord.js");const model = require("../models/guild")
module.exports  = async (_,oldChannel,newChannel) => {
        const { modlogChannel } = await model.findOne({ GuildID: oldChannel.guild.id }) || { modlogChannel: null };
    if (!modlogChannel) return;
  
    const channel = oldChannel.guild.channels.cache.get(modlogChannel);
    try{
      channel.send({
        embeds: [new MessageEmbed()
          .setDescription(`**Kanal Güncellendi!**`)
          .addField("Eski Kanal Adı",oldChannel.name,true)
          .addField("Eski Tipi",oldChannel.type
          .replace("GUILD_TEXT","Yazı Kanalı")
          .replace("GUILD_VOICE","Ses Kanalı")
          .replace("GUILD_CATEGORY","Kategori")
          .replace("GUILD_NEWS","Duyuru Kanalı")
          .replace("GUILD_STAGE_VOICE","Sahne Kanalı")
          ,true)
  
          .addField("Yeni Kanal Adı",newChannel.name,false)
          .addField("Yeni Kanal Tipi",newChannel.type
          .replace("GUILD_TEXT","Yazı Kanalı")
          .replace("GUILD_VOICE","Ses Kanalı")
          .replace("GUILD_CATEGORY","Kategori")
          .replace("GUILD_NEWS","Duyuru Kanalı")
          .replace("GUILD_STAGE_VOICE","Sahne Kanalı")
          ,true)
          .addField("NSFW",channel.nsfw ? "Evet" : "Hayır",true)
          .setColor("#2ACAEA")
          .setFooter({text:`${oldChannel.guild.name}`})
          .setTimestamp()
        ]
      })
    }
    catch{
  
    }
 
}
