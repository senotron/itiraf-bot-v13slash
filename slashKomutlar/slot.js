const { Permissions,Client,CommandInteraction,MessageEmbed,MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");



module.exports = {
  name: "logo-kur",
  description: "Bot sana logo kurar!",
  type: 1,
  options: [
    {
        name:"yazı",
        description:" Logo oluşturmak için bir yazı gir!",
        type:3,
        required:true
    },
  ],

  run: async(client, interaction) => {
    const yazı = interaction.options.getString("yazı")

let api = `https://dynamic.brandcrowd.com/asset/logo/7f0254b2-49ae-4819-9107-47728665a65f/logo?v=4&text=${yazı}`
  const embed = new MessageEmbed()
  
  .setColor("BLUE")
  .setImage(api)    
    let apis = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=graffiti-logo&text=${yazı}`
  const embeds = new MessageEmbed()
  .setColor("BLUE")
  .setImage(apis)    
      let apis1 = `https://habbofont.net/font/reception/${yazı}.gif`
  const embeds1 = new MessageEmbed()
  .setColor("BLUE")
  .setImage(apis1)
  
  
            interaction.reply({embeds:[embed,embeds,embeds1]});

    
    

}
  
  
   
  
  
};