
const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
module.exports = {
    name:"yetkili-başvuru-yardım",
    description: 'Yetkili Başvuru Komutlari( V14 butonlu)',
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
     .setTitle("👨🏻‍✈️ Yetkili Başvuru Komutlari")
     .setDescription(`p!başvuru-log(Yalnız yönetim erişmeli)
p!sonuç-kanal
p!verilecek-rol
p!başvur`)

     if(client.ws.ping < 60) embed.setColor("GREEN")
     else if(client.ws.ping > 60 && client.ws.ping < 120) embed.setColor("YELLOW")
     else if(client.ws.ping > 120) embed.setColor("RED")


     interaction.reply({embeds:[embed]});
}
};  