const { MessageEmbed,Client,CommandInteraction,MessageActionRow,MessageButton,Permissions } = require("discord.js");
const {butonrol1,buton1isim,embedaçıklama1,embedaçıklama,emoji} = require("../config.json");

module.exports = {
    name:"gönder",
    description: 'gönder',
    type:1,
    options:[ 
        
     {
            name:"kanal",
            description:"Gönderilecek kanalı ayarlarsınız",
            required:true,
            type:7,
            channelTypes:["GUILD_TEXT"],
        }, 
      
      
      
       ],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
            const {guild, options} = interaction;
                  const channel = options.getChannel("kanal");

      
       const embed = new MessageEmbed()
                .setAuthor({
                    name:`${guild.name} `,
                    iconURL:guild.iconURL({dynamic:true})
                })
                .setDescription(` ${embedaçıklama} `)
                .setColor("GREEN");
      
   const buton = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("1buton").setLabel(`${buton1isim}`).setStyle("PRIMARY").setEmoji(`${emoji}`),
)
   
   
   
   interaction.reply({content:"Gönderildi!<:true:1025875522393211010>",ephemeral:true});
                guild.channels.cache.get(channel.id)
                .send({embeds:[embed], components:[buton]});
}
};