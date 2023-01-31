const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name:"setnick",
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    type:1,
    options: [
        {
            name:"user",
            description:"Kullanıcı ismi değiştirilecek kullanıcıyı seçin!",
            type:6,
            required:true
        },
        {
            name:"isim",
            description:"Yeni ismi yaz!",
            type:3,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {
    const isim = interaction.options.getString('isim')
    const uye =  interaction.options.getUser('user');
    let nick = uye.displayName;
    interaction.guild.members.cache.get(uye.id).setNickname(isim);
    
 interaction.reply(
    new MessageEmbed()
      .setColor("#00ff00")
      .setTitle("İsim Değiştirildi!")
      .addField("İsmi Değiştirilen", `${uye.username}`)
      .addField("Yeni İsmi", `${isim}`)
      .setFooter("İsim Başarıyla Değiştirildi")
  );

     

  }

};