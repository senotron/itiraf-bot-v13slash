const { Client,  MessageEmbed } = require("discord.js");
module.exports = {
    name:"herkesten-rol-al",
    description: 'Birine Rol Verirsin!',
    type:1,
    options: [

        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction,message, args) => {
        const rol = interaction.options.getRole('rol')

    
    
    if(!interaction.member.permissions.has("ManageRoles")) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    interaction.guild.members.cache.forEach(arez => arez.roles.remove(rol))
    return  interaction.reply(`Herkesten **<@&${rol.id}>** id'li rol alınıyor. Bu işlem sunucunun büyüklüğüne göre olarak zaman alabilir.`)
}}

  