const {CLient, CommandInteraction, ButtonInteraction, MessageEmbed, MessageButton, MessageActionRow, Collection} = require("discord.js");
const fs = require("fs");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 * @param {ButtonInteraction} button
 */
module.exports = async (client, interaction, button) => {
    if (interaction.isCommand()){
    try {
      fs.readdir("./slashKomutlar/", (err, files) => {
        if (err) throw err;

        files.forEach(async (f) => {
          const command = require(`../slashKomutlar/${f}`);
          if (
            interaction.commandName.toLowerCase() === command.name.toLowerCase()
          ) {
            return command.run(client, interaction);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

     if(interaction.isSelectMenu()){
       if(interaction.customId !== 'reaction-roles') return;
       await interaction.deferReply({ephemeral:true})
       const roleId = interaction.values[0];
       const role = interaction.guild.roles.cache.get(roleId)
       const memberRole = interaction.member.roles;
       
       const hasRole = memberRole.cache.has(roleId);

       if(hasRole){
         memberRole.remove(roleId);
         interaction.followUp({content:`**${role.name}** rolü senden alındı`, ephemeral:true})
       }else {
        memberRole.add(roleId);
        interaction.followUp({content:`**${role.name}** rolü verildi`, ephemeral:true})
       }
     }
    if (interaction.isButton()){

      const {guild, member, customId, channel} = interaction;
      const db = require("../models/ticket")
      const TicketSetupData = require("../models/ticketSetup")
      
      const Data = await TicketSetupData.findOne({ GuildID: guild.id });
      if(!Data) return;

      if(customId == "destek"){
        const id = Math.floor(Math.random() * 90000) + 10000;
        await guild.channels.create(`destek-${id}`, {
          type: "GUILD_TEXT",
          parent: Data.Category,
          permissionOverwrites: [
            {
              id: member.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
            },
            {
              id: Data.Handlers,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
            },
            {
              id: Data.Everyone,
              deny: ["VIEW_CHANNEL"],
            }
          ]
        }).then(async (channel) => {
          await db.create({
            GuildID: guild.id,
            MembersID: [member.id],
            Handlers: Data.Handlers,
             DestekKapayan: Data.DestekKapayan,
            TicketID: id,
            ChannelID: channel.id,
            Closed: false,
            Locked: false,
            Type: "Destek",
            Claimed: false,
          })
          const embed = new MessageEmbed()
          .setAuthor({name:`${guild.name} | Destek: ${id}`,iconURL:guild.iconURL({dynamic:true})})
          .setDescription(`Destek ekibi birazdan burdan olur sakın endişelenme! sorununu hemen çözeceklerine inanıyorum :)
          Destek işlemlerini aşağıdaki butonlar ile yapabilirsin.`)

          const buton = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("close").setLabel("Kaydet ve Kapat").setStyle("PRIMARY").setEmoji("💾"),
            new MessageButton().setCustomId("lock").setLabel("Kilitle").setStyle("SECONDARY").setEmoji("🔒"),
            new MessageButton().setCustomId("unlock").setLabel("Aç").setStyle("SUCCESS").setEmoji("🔓"),
          )

          channel.send({content:`${member} | <@&${Data.Handlers}> Destek talebi açıldı`})
          channel.send({embeds:[embed],components:[buton]})
          interaction.reply({content:`Talep açıldı! ${channel}`,ephemeral:true});

        })
      }
    
    } 
  
 if (interaction.isButton()){


      if(interaction.customId == "random-hesap"){
        await  interaction.reply({embeds:[new MessageEmbed().setTitle("Yakında").setColor("GREEN").setDescription(`Çok kısa zamanda👑✌`)],ephemeral:true})        
}} 
  
  
      if (interaction.isButton()){

      const {guild, member, customId, channel} = interaction;
      const {butonrol1,buton1isim} = require("config.json");


      if(customId == "1buton"){

       const role = interaction.guild.roles.cache.get(butonrol1)
       const memberRole = interaction.member.roles;
       
       const hasRole = memberRole.cache.has(butonrol1);

       if(hasRole){
         interaction.reply({content:`Zaten kayıtlısın`, ephemeral:true})
       }else {
        memberRole.add(butonrol1);
        interaction.reply({content:`Başarıyla sunucumuza kayıt oldun`, ephemeral:true})
       }
     }
          
              
          
          
          
          
      
};
  
  
  
  
};
