const fs = require("fs");
const {Client, Intents, MessageActionRow,MessageButton,MessageEmbed,Collection, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const TicketSetupData = require("./models/ticketSetup")
const db = require("./models/ticket")
const {createTranscript} = require("discord-html-transcripts");
const { joinVoiceChannel } = require('@discordjs/voice'); 
const d2b = require("croxydb") 
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })
const client = new Client({
  fetchAllMembers: true,
  intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS

    
  ]});

//const dotenv = require("dotenv")
//dotenv.config({ path: "./.env" })

const mongoose = require("mongoose");
mongoose.connect(process.env.mongoDB)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err))


global.client = client;
client.commands = (global.commands = []);
fs.readdir("./slashKomutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./slashKomutlar/${file}`);

        client.commands.push({
             name: props.name.toLowerCase(),
             description: props.description,
             options: props.options,
             category: props.category,
          
             
        })
        console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
    });
})
;
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        
        console.log(`👌 Event yüklendi: ${eventName}`);
        client.on(eventName, (...args) => {
           event(client, ...args);
        });
    });
});


client.on("ready", async () => {
  
    const rest = new REST({ version: "9" }).setToken(process.env.token);

  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
});


client.login(process.env.token);





client.on("interactionCreate",async interaction => {
  if(!interaction.isButton()) return
  const { guild,customId,channel,member } = interaction;
  
      
      const Data = await TicketSetupData.findOne({ GuildID: guild.id });
      if(!Data) return;
  

  if(!["close","sil","lock","unlock"].includes(customId)) return;

    if(!TicketSetupData) 
    return interaction.reply({content:`Bu sistem için veriler eski`,ephemeral:true});

    
    const Embed = new MessageEmbed().setColor("BLUE");
    
   db.findOne({ChannelID: channel.id}, async (err, docs) => {
     if(err) throw err;
     if(!docs)
     return interaction.reply({
       content:"destek talebi hakkında veri bulunamadı lütfen manuel işlem yapınız",
       ephemeral:true
     }) .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));
     

     switch(customId){
         
       case "sil":

          interaction.reply({content:"Bu komutu kullanabilmek için `Destek Kapama` yetkisine sahip olmalısın!",ephemeral:true});
          return;
   if(member.roles.cache.has(hnd))        {

        interaction.reply({content:"Kanal siliniyor",ephemeral:false});
        await channel.delete()};
         break;

         case "lock":
           if(docs.Locked == true) return interaction.reply({content:"Bu destek talebi zaten kilitli",ephemeral:true})
           .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));

           await db.updateOne({ChannelID: channel.id}, {Locked: true})
           Embed.setDescription(`🔒 | Destek talebi kilitlendi`)
           
           docs.MembersID.forEach(async (m) => {
           channel.permissionOverwrites.edit(m, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
            })
            }) 
            interaction.reply({embeds:[Embed]})
            .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));
          break; 

          case "unlock":
            if(docs.Locked == false) return interaction.reply({content:"Bu destek talebi zaten açık",ephemeral:true})
            .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));
            await db.updateOne({ChannelID: channel.id}, {Locked: false})
            Embed.setDescription(`🔓 | Destek talebi açıldı`)
            docs.MembersID.forEach(async (m) => {
            channel.permissionOverwrites.edit(m, {
                SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               })
             })
              interaction.reply({embeds:[Embed]})
              .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));
          break; 

          case "close":
                      //izin
    const {Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");
    const data = await TicketSetupData.findOne({ DestekKapayan: Data.DestekKapayan, });
    const hnd = data ? data.DestekKapayan : null;
        

   if(member.roles.cache.has(hnd))       
 {
 interaction.reply({content:`Destek talebi Kaydedildi ve kapatıldı!\nBu kanal 5 saniye sonra silinecektir`})  
 .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));
 setTimeout(() => {
  channel.delete();
 },5000)
            break;
      }
             if(docs.Closed){
              await interaction.reply({
                content:"Bu destek talebi zaten kapatılmış",
                components:
                [new MessageActionRow()
                  .addComponents(
                new MessageButton()
                .setCustomId("sil")
                .setLabel("Kanalı Sil")
                .setStyle("SECONDARY")
                .setEmoji("🗑️"),
             )],ephemeral:false}).catch(err => interaction.channel.send({content:`${err}`}));
             return;
             }  
 const dosya = await createTranscript(channel, {
   limit: -1,
   returnBuffer: false,
   fileName: `${docs.TicketID}.html`,
 });
 
 await db.updateOne({ChannelID: channel.id}, {Closed: true});
 await guild.channels.cache.get(Data.Transcripts).send({
   embeds: [Embed.setTitle(`Transcripts Type: ${docs.Type}\nTicket ID: ${docs.TicketID}`)],
 files: [dosya],
 });

         
         //izin
        
          interaction.reply({content:"Bu komutu kullanabilmek için `Destek Kapama` yetkisine sahip olmalısın!",ephemeral:true});
          return;
           //izin
   if(member.roles.cache.has(hnd))        {
 interaction.reply({content:`Destek talebi Kaydedildi ve kapatıldı!\nBu kanal 5 saniye sonra silinecektir`})  
 .catch(err => interaction.channel.send({content:`${err}`,ephemeral:true}));
 setTimeout(() => {
  channel.delete();
 },5000)
            break;

     
     
     
     
     
     
      }
}

  })
  
})



                                            // Eklentiler//




////Oylama başladı ////
client.on("messageCreate", async message => {
if(message.guild.id === "854750196315062302"){
if(message.channel.id === "998159320191619102"){
message.react("<:true:1025875522393211010>")
message.react("<:cross:999958697310695504>") 
}
}
})
client.on("messageCreate", async message => {
if(message.guild.id === "854750196315062302"){
if(message.channel.id === "998162149379674172"){//basvuru
message.react("<:true:1025875522393211010>")
message.react("<:cross:999958697310695504>") 
}
}
})
client.on("messageCreate", async message => {
if(message.guild.id === "854750196315062302"){
if(message.channel.id === "998676757676822638"){//duyuru
message.react("<:true:1025875522393211010>")
}
}
})
client.on("messageCreate", async message => {
if(message.guild.id === "854750196315062302"){
if(message.channel.id === "998157862582878228"){//v.duyuru
message.react("<:true:1025875522393211010>")
}
}
})

////Oylama bitdi ////

//Sese girme Başlangıç
 client.on('ready', () => {  //PsychoPath
  joinVoiceChannel({ 
channelId: "998163697811849246", //PsychoPath
guildId: "854750196315062302",    //PsychoPath
adapterCreator: client.guilds.cache.get("854750196315062302").voiceAdapterCreator
    }); //PsychoPath
}); //PsychoPath
 client.on('ready', () => {  
  joinVoiceChannel({ 
channelId: "957574121846349844", 
guildId: "787298889325084704",    
adapterCreator: client.guilds.cache.get("787298889325084704").voiceAdapterCreator
    }); 
}); 
//Sese girme son

// Bot Bilgi Başlangıç 
const moment = require("moment")
const os = require("os")

client.on("ready", () => {
  setInterval(function() {
  const uptime = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"); 
  const iping = client.ws.ping
  const ibelekkullanımı = (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2)
  const ikullanıcı = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
  const isunucular = client.guilds.cache.size.toLocaleString()
  const iKanallar = client.channels.cache.size.toLocaleString()
  
  const embed = new MessageEmbed()
.setColor("BLACK")
.setFooter({ text:"© 2022-2023 PsychoPath Bot"})
.addField("» **Botun Sahibi**", "\`\`\`MrSn#7992\`\`\`", true)
.addField("» **Geliştirici** ","\`\`\`MrSn#7992\`\`\`", true)
.addField("» **Bellek kullanımı**", `\`\`\`${ibelekkullanımı} MB\`\`\``, true)
.addField("» **Çalışma süresi**", `\`\`\`${uptime}\`\`\``, true)
.addField("» **Kullanıcılar**", `\`\`\`${ikullanıcı}\`\`\``, true)
.addField("» **Sunucular**", `\`\`\`${isunucular}\`\`\``, true)
.addField("» **Kanallar**", `\`\`\`${iKanallar}\`\`\``, true)
.addField("» **Node.JS sürüm**", `\`\`\`${process.version}\`\`\``, true)
.addField("» **Ping**", `\`\`\`${iping} ms\`\`\``, true)
.addField("» **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
.addField("» **Bit**", `\`\`\`${os.arch()}\`\`\``, true)
.addField("» **İşletim Sistemi**", `\`\`\`${os.platform()}\`\`\``, true)
.addField("» **Bot Davet**", "[Davet Et](https://discord.com/api/oauth2/authorize?client_id=969829299601412156&permissions=8&scope=bot%20applications.commands)", false)
client.channels.cache.get("1047921908299083889").messages.fetch("1047922801392242688")
        .then(msg => { msg.edit({ embeds: [embed] })
        });
}, 1000);
});
// Bot Bilgi Son


//Şikayet baş
client.on("messageCreate", async message => {
  if(message.content !== "şikayet") return;
  if(message.guildId !== "854750196315062302") return; //bu satırı kullanıma bağlı silebilirsiniz.
  let rep = message.reference; 
  let msg = await client.channels.cache.get(rep.channelId).messages.fetch(rep.messageId);

  client.channels.cache.get("1052161232926421002").send({ embeds: [ new MessageEmbed()
    .setTitle("Mesaj Şikayeti!")
    .setDescription(`
      Bildiren: <@${message.author.id}> | Bildirilen: <@${msg.author.id}>
      Gönderilme Tarihi:  | [Mesaja Git](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id})

      __Bildirilen Mesaj:__
      \`\`\`\n${msg.content ? msg.content : "Bu mesaj sadece dosya/embed içeriyor."}\`\`\`
    `)
  ]})

  message.reply("Mesaj bildirildi.").then(m => setTimeout(() => { message?.delete(), m?.delete() }, 3000))
})
//Şikayet son


//Afk baş
const ms = require("ms");
client.on("messageCreate" ,async message => {
    if(!message.guild) return;
   if (message.content.includes(`afk`)) return;
    let etiket = message.mentions.users.first()
    let uye = d2b.fetch(`afk_${message.author.id}`)
    let nickk = d2b.fetch(`nick_${message.author.id}_${message.guild.id}`)
if (await d2b.get(`afk_${message.author.id}`)) {

    d2b.delete(`afk_${message.author.id}`);
      message.member.setNickname(nickk)

    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }
    
  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;

  var sebep = await d2b.get(`afk_${kullanıcı.id}`);
      var time = await d2b.fetch(`afktime_${message.guild.id}`);
      var timeObj = await ms(Date.now() - time);
  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı `"+sebep+"` Sebebiyle `"+timeObj+"` Afk Modunda!");
  }

  

});
//Afk son

// Oto Tag Baş
client.on("guildMemberAdd", member => {
  const tag = d2b.get(`ototag_${member.guild.id}`)
  if(!tag) return;
  member.setNickname(`${tag} | ${member.displayName}`)
})
// Oto Tag Son

// Oto rol baş
client.on("guildMemberAdd", member => {
  const rol = d2b.get(`otorol_${member.guild.id}`)
  if(!rol) return;
  member.roles.add(rol).catch(() => {})
})
//Oto rol son

//Sa-as baş
client.on("messageCreate", (message) => {
  
  let saas = d2b.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.reply(` Aleykümselam, Hoşgeldin ☺️`)
  
}
}
})
//Sa-as son

//Oto yanıt

client.on("messageCreate", (message) => {
  const {butonrol1,buton1isim,embedaçıklama1,embedaçıklama,emoji,emoji1} = require("config.json");


  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'kayıt' ){

message.reply(` Aleykümselam, Hoşgeldin ☺️`)
  
}
}
)
