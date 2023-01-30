const model = require("../models/guild")
const yetkiler = require("../perm.json");

const {MessageEmbed} = require("discord.js");
module.exports = 
    async (_,oldRole,newRole) => {
        
        const { modlogChannel } = await model.findOne({ GuildID: oldRole.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
        if(oldRole.permissions.toArray() === newRole.permissions.toArray()) return;

        const channel = oldRole.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new MessageEmbed()
              .setDescription(`**Rol Güncellendi!**`)
              .addField("Eski Rol Adı",oldRole.name,true)
              .addField("Eski Rol Rengi",oldRole.hexColor,true)
              .addField("Eski Rol ikonu",oldRole.iconURL() ? `[Görüntüle](${oldRole.iconURL()})` : "icon yok",true)
      
              .addField("Yeni Rol Adı",newRole.name,true)
              .addField("Yeni Rol Rengi",newRole.hexColor,true)
              .addField("Yeni Rol ikonu",oldRole.iconURL() ? `[Görüntüle](${oldRole.iconURL()})` : "icon yok",true)
      
              .addField("Oluşturulma tarihi",`<t:${parseInt(newRole.createdTimestamp / 1000)}:R>`,true)
              .setColor("#2ACAEA")
              .setFooter({text:`${newRole.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch{
      
        }
}
