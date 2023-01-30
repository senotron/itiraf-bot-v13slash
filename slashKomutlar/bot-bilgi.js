const os = require("os")
const {MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js")
const moment = require("moment")
require('moment-duration-format')
module.exports = {

    name: 'bot-bilgi', //https://psychopath-techonology.ml/
    description: 'Bot hakkında bilgiler verir.',
    category: 'Info',
    options: [],
  
    requiredPermissions: [],
    requiredPermissionsMe: [],
  
    disabled: false,
    developerOnly: false,
    
    run: async (client, interaction) => {
   
      const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
        .setCustomId("infoselectmenu") 
        .setPlaceholder('Tıkla')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          
          {
            label:"Bot Hakkında Bilgiler" ,
            description:"",
            value:"psychopath",
            emoji:"🤖" 
          },
          ])
        )
        await interaction.reply({content: "Aşağıdan `Bot Hakkında Bilgiler` seçin.", components: [row]})
        client.on("interactionCreate", async interaction => {
          if (!interaction.isSelectMenu()) return;
          if(interaction.customId === "infoselectmenu") {
             
     const iskullanıcı = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()

     if(interaction.values[0] === "psychopath") { //https://psychopath-techonology.ml/
      const uptime = moment.duration(client.uptime).format("w [hafta], d [gün], h [saat], m [dakika], s [saniye]")
      const embed = new MessageEmbed()
      .setTitle("Bot Bilgileri")
      .addFields(
        {name: "Sunucu Sayısı", value: `${client.guilds.cache.size}`},
        {name: "Kullanıcı Sayısı", value: `${iskullanıcı}`},
        {name: "Kanal Sayısı", value: `${client.channels.cache.size}`},
        {name: "Bit", value: `${os.arch}`},
        {name: "Çalışma Süresi", value: `${uptime}`},
        {name: "CPU", value: `${os.cpus().map(i => `${i.model}`)[0]}`},
        {name: "Ram Kullanımı", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} / ${(os.totalmem() / 1024 / 1024).toFixed(0)} MB`},
        {name: "Sahip", value: `[! PsychoPath#7992 | 840158550495723530](https://discord.com/users/840158550495723530)`},

      )
      .setColor("#00CCFF")
      await interaction.reply({embeds:[embed]})
    } 
          } //https://psychopath-techonology.ml/
        })
    },
  };