const { MessageEmbed, Permissions, Client, CommandInteraction,MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const model = require("../models/ban")
module.exports = {
    name:"ban",
    description: 'Kullanıcıyı Sunucuan Uzaklaştırır',
    type:1,
    options: [
        {
            name:"user",
            description:"Yasaklanıcak Kullanıcıyı Seçin",
            type:6,
            required:true
        },
        {
            name:"reason",
            description:"Hangi Sebepten dolayı yasaklanıcak?",
            type:3,
            required:true
        },
    ],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
        const data = await model.findOne({ guildID: interaction.guild.id }) || null;

       const banRol = data ? data.roleID : null;

       if(
           interaction.member.roles.cache.has(banRol) ||
           interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
           
        )
        {
           
            const user = interaction.options.getMember('user')
            const sebep = interaction.options.getString('reason')
            
            if(user.id == interaction.member.id) return interaction.reply({content:"Kendini Yasaklayamazsın",ephemeral:true})
            if(user.id == client.user.id) return interaction.reply({content:"Kendimi Yasaklayamam",ephemeral:true})
            if(user.id == interaction.guild.ownerID) return interaction.reply({content:"Sevgili Sunucu Sahibini Yasaklayamazsın",ephemeral:true})
            if(user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content:"Bu Kullanıcıyı Yasaklayamazsın",ephemeral:true})
            if(user.roles.cache.has(banRol)) return interaction.reply({content:"Bunu Ban yetkilisi üzerinde yapamazsın",ephemeral:true})

            try{
    
            
            await interaction.guild.bans.fetch(interaction.member.id)
            .then(() => { interaction.reply("Bu Kullanıcı zaten yasaklanmış"); })
            }
        
        catch{
const guild = interaction.guild
const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
        .setCustomId("infoselectmenu") 
        .setPlaceholder('Tıkla')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label:"Banlanacak üyeye dm'den bilgi gitsin",
            description:"",
            value:"userb",
            emoji:"<:true:1025875522393211010>"
          },
          {
            label:"Banlanacak üyeye dm'den bilgi gitmesin",
            description:"",
            value:"serverb",
            emoji:"<:cross:999958697310695504> "
          },

          ])
        )
        await interaction.reply({content: "Banlama yönetimini seçin.", components: [row]})
        client.on("interactionCreate", async interaction => {
          if (!interaction.isSelectMenu()) return;
          if(interaction.customId === "infoselectmenu") {
             
    if(interaction.values[0] === "userb") {

                
      client.users.cache.get(user.id).send(`**${guild}** sunucusundan **${sebep}** sebebiyle banlandın`)
      user.ban({reason: sebep});
      await interaction.reply({embeds:[
          {
            title:`Üye banlandı `,
            description:`<@!${user.id}> isimli kullanıcı yasaklandı ve dm'den bilgi gönderildi`
          }
        ],ephemeral: false });        setTimeout(() => {
      interaction.deleteReply();
        }, 5000);
    } else if(interaction.values[0] === "serverb") { 
 setTimeout(() => {
      interaction.deleteReply();
        }, 5000);
                    user.ban({reason: sebep});
      await interaction.reply({embeds:[
          {
            title:`Üye banlandı `,
            description:`<@!${user.id}> isimli kullanıcı yasaklandı`
          }
        ],ephemeral: false });        
     
    }
          }
        })

        }
    }
    else
       return interaction.reply({content:"Bu komutu kullanmak için yetkiniz yok",ephemeral:true});
 
}

};