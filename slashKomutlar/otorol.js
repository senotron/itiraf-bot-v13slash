const d2b = require("croxydb")
module.exports = {
    name:"oto-rol",
    description: 'Yeni Gelenlere Otomatik Rol Verir!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!(Kapatmak için everyone seçin)",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has("ManageRoles")) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    d2b.set(`otorol_${interaction.guild.id}`, rol.id)
    interaction.reply({content: "Otorol Başarıyla <@&"+rol+"> Olarak Ayarlandı."})
}

};