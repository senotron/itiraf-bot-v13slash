const {MessageEmbed} = require("discord.js");const model = require("../models/guild")
module.exports  = async (_,channel) =>{
        const { modlogChannel } = await model.findOne({ GuildID: channel.guild.id }) || { modlogChannel: null };
    if (!modlogChannel) return;
    if(channel.id == modlogChannel)
    {
      await model.updateOne({GuildID: channel.guild.id},{modlogChannel: null});
      return;
    }
    const log = channel.guild.channels.cache.get(modlogChannel);
    try{
      log.send({
        embeds: [new MessageEmbed()
          .setDescription(`**Kanal silindi!**`)
          .addField("Kanal Adı",channel.name,true)
          .addField("Tipi",channel.type
          .replace("GUILD_TEXT","Yazı Kanalı")
          .replace("GUILD_VOICE","Ses Kanalı")
          .replace("GUILD_CATEGORY","Kategori")
          .replace("GUILD_NEWS","Duyuru Kanalı")
          .replace("GUILD_STAGE_VOICE","Sahne Kanalı")
          ,true)
          .addField("NSFW",channel.nsfw ? "Evet" : "Hayır",true)
          .setColor("#2ACAEA")
          .setFooter({text:`${channel.guild.name}`})
          .setTimestamp()
        ]
      })
    }
    catch{
  
    }
 
}
