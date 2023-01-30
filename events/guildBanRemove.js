const {MessageEmbed} = require("discord.js");const model = require("../models/guild")
module.exports = async (_,ban) =>{

        const { modlogChannel } = await model.findOne({ GuildID: ban.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
      
        const channel = ban.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:ban.user.tag,iconURL: ban.user.avatarURL()})
              .setDescription(`**${ban.user}** adlı kullanıcı sunucudan yasağı kaldırıldı!`)
              .addField("Yasaklama sebebi",`\`\`\`${ban.reason}\`\`\``,false)
              .setColor("#2ACAEA")
              .setFooter({text:`${ban.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch{
      
        }
}