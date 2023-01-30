const model = require("../models/guild");
const {MessageEmbed} = require("discord.js");
module.exports = async (_,role) => {

        const { modlogChannel } = await model.findOne({ GuildID: role.guild.id }) || { modlogChannel: null };
    if (!modlogChannel) return;
  
    const channel = role.guild.channels.cache.get(modlogChannel);
    try{
      channel.send({
        embeds: [new MessageEmbed()
          .setDescription(`**Yeni Rol Oluşturuldu!**`)
          .addField("Rol Adı",role.name,true)
          .addField("Rol Rengi",role.hexColor,true)
          .addField("Rol ikonu",role.iconURL() ? `[Görüntüle](${role.iconURL()})` : "icon yok",true)
          .addField("Oluşturulma tarihi",`<t:${parseInt(role.createdTimestamp / 1000)}:R>`,true)
          .setColor("#2ACAEA")
          .setFooter({text:`${role.guild.name}`})
          .setTimestamp()
        ]
      })
    }
    catch(err){
      console.log(err)
    }
}