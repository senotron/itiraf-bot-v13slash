const {MessageEmbed} = require("discord.js");
const model = require("../models/guild") 
module.exports = async (_,channel) => {
        const { modlogChannel } = await model.findOne({ GuildID: channel.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
      
        const logs = channel.guild.channels.cache.get(modlogChannel);
        try{
          logs.send({
            embeds: [new MessageEmbed()
              .setDescription(`**Yeni Kanal Oluşturuldu!**`)
              .addField("Kanal Adı",channel.name,true)
              .addField("Kanal Tipi",
              channel.type
              .replace("GUILD_TEXT","Yazı Kanalı")
              .replace("GUILD_VOICE","Ses Kanalı")
              .replace("GUILD_CATEGORY","Kategori")
              .replace("GUILD_NEWS","Duyuru Kanalı")
              .replace("GUILD_STAGE_VOICE","Sahne Kanalı")
              ,true)
              .addField("Oluşturulma tarihi",`<t:${parseInt(channel.createdTimestamp / 1000)}:R>`,true)
              .addField("NSFW",channel.nsfw ? "Evet" : "Hayır",true)
              .setColor("#2ACAEA")
              .setFooter({text:`${channel.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch(err){ 
        // console.log(err)
        }
 
}
