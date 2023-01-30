const { MessageEmbed,CommandInteraction,Client,Permissions } = require("discord.js");

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
        .setTitle(`Butonlu Abone Rol Komutlari`)
        .setDescription(".a - Abone rol verir \r\n .abone-yetkilisi - Abone Rol yetkili ayarlar \r\n .abone-rol -  ayarlar")
   


        interaction.reply({embeds:[embed]});
    }
};