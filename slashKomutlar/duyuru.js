const { MessageEmbed,Client,CommandInteraction,MessageActionRow,MessageButton,Permissions } = require("discord.js");
module.exports = {
    name:"abone-rol-sistem",
    description: 'Butonlu Abone Rol',
    type:'CHAT_INPUT',
    category:"info",
    options:[],
    /**
     *  
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */ 

    run: async (client, interaction) => {




  
  const embed = new MessageEmbed()
.setColor("BLACK")
.setFooter({ text:"© 2022-2023 PsychoPath Technology"})
.setDescription("Sitemizi geliştiriyoruz..... :pin:  \r\n Artık sitemizde kendi projenizi 7/24 aktif ede bilirsiniz!", true)


.addField("» **Site**", "[Siteye git](https://psychopath-techonolgy.tk/uptime/links)", false)

}
}