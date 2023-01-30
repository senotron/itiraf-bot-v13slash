const {MessageEmbed} = require("discord.js");
const model = require("../models/guild")
module.exports = async (_,member) =>{

        const { gircikChannel } = await model.findOne({ GuildID: member.guild.id }) || { gircikChannel: null };
        if (!gircikChannel) return;
      
        const channel = member.guild.channels.cache.get(gircikChannel);
        try{
          channel.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
              .setDescription(`**<@!${member.user.id}>** adlı kullanıcı sunucudan ayrıldı!`)
              .setColor("#2ACAEA")
              .setFooter({text:`${member.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch{
      
        }
}