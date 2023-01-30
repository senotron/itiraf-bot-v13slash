module.exports = {
    name:"setnick",
    description: 'setnick',
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

 interaction.member.setNickname(isim);

    interaction.reply(`${uye} Kullanıcısının ismi  ${isim} olarak değiştirildi!`)

     

  }

};