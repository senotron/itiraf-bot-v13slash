const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
   
    name:"kullanıcı-bilgi",
    description: 'Kullanıcı hakkında bilgi verir',
    type:'CHAT_INPUT',
    category:"info",
    options:[
      {name:"kullanıcı",
      description:"Bilgisi gösterilicek kullanıcı",
    type:6}],
    run: async (client, interaction) => {
 /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
        const target = interaction.options.getMember("kullanıcı") || interaction.member;
        const embed = new MessageEmbed()
          .setColor("AQUA")
         .setAuthor({name: target.user.tag, iconURL: target.user.avatarURL({dynamic:true})})
         if(target.user.avatarURL()){
           embed.setThumbnail(target.user.avatarURL({dynamic:true}))
        }
        embed
        .addField(`Kullanıcı ID`,`${target.user.id}`,false)
        .addField(`Roller`,`${target.roles.cache.map(r => r).join(" ").replace("@everyone","") || "Yok"}`,false)
   
        .addField(`Katılım Tarihi (Sunucu)`, `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField(`Katılım Tarihi (Discord)`, `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)
        interaction.reply({embeds:[embed]});
      
}
};