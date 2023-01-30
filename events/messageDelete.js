const model = require("../models/guild")
const {MessageEmbed,Message,Client} = require("discord.js");
/**
 * 
 * @param {Client} _ 
 * @param {Message} message 
 * @returns 
 */
module.exports = async (_,message) =>{
  if(message.author.bot) return;
        const { modlogChannel } = await model.findOne({ GuildID: message.guildId }) || { modlogChannel: null };
        if (!modlogChannel) return;
        if(message.channelId == modlogChannel) return;
      
        const channel = message.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:message.member.user.tag,iconURL: message.member.user.avatarURL()})
              .setDescription(`**${message.member} tarafından gönderilen mesaj ${message.channel} kanalında silindi!**`)
              .addField("Mesaj içeriği",`\`\`\`${message.content}\`\`\``,false)
              .setColor("#2ACAEA")
              .setFooter({text:`${message.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch(err){
          console.log(err)
        }
 

}