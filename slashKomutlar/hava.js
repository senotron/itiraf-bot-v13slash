const { Permissions,Client,CommandInteraction,MessageEmbed,MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");


const instagram = require("user-instagram");

module.exports = {
  name: "havadurumu",
  description: "Yazılan konumun hava durumu bilgisini gösterir.",
  type: 1,
  options: [
    {
        name:"konum",
        description:"Konumu gir!",
        type:3,
        required:true
    },
  ],

  run: async(client, interaction) => {
    const konum = interaction.options.getString("konum");
let api = `http://wttr.in/${konum}_0tqp_lang=tr}.png`
  const embed = new MessageEmbed()
  .setColor("BLUE")
  .setImage(api)    
   
            interaction.reply({embeds:[embed]});

    
    

}
  
  
   
  
  
};