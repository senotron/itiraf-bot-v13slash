const { MessageEmbed,CommandInteraction,Client,Permissions,MessageActionRow ,MessageButton} = require("discord.js");
const guildData = require("../models/guild");
const banData = require("../models/ban");
const kickData = require("../models/kick");
module.exports = {
    name:"ayarlar",
    description: 'Sunucu ayar Menüsü',
    type:1,
    options:[],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    
    run: async (client, interaction) => {

        let modlg;
        let banD;
        let kick;
        const {kfrEngel,lnkEngl,modlogChannel,kelimeEngl} = await guildData.findOne({ GuildID: interaction.guild.id }) || {kfrEngel:false,lnkEngl:false,modlogChannel:null,kelimeEngl:false};
        if(!modlogChannel) modlg = false;
        else modlg = true;

        

        const {BanSystem} = await banData.findOne({ GuildID: interaction.guild.id }) || {BanSystem:false};
        if(!BanSystem) banD = false; else banD = true;
        const {KickSystem} = await kickData.findOne({ GuildID: interaction.guild.id }) || {KickSystem:false};
        if(!KickSystem) kick = false; else kick = true;

        const embed = new MessageEmbed()
        .setTitle(`${interaction.guild.name} Sunucusu ayarları`)
        .addField("Ban Sistemi",banD ? "<:true:1025875522393211010> Açık" : " <:cross:999958697310695504> Kapalı",true)
        .addField("Küfür Engel Sistemi",kfrEngel ? "<:true:1025875522393211010> Açık" : "<:cross:999958697310695504> Kapalı",true)
        .addField("Kelime Engel Sistemi",kelimeEngl ? "<:true:1025875522393211010> Açık" : "<:cross:999958697310695504> Kapalı",true)
        .addField("Link Engel Sistemi",lnkEngl ? "<:true:1025875522393211010> Açık" : "<:cross:999958697310695504> Kapalı",true)
        .addField("Mod-Log Kanalı",modlg ? "<:true:1025875522393211010> Ayarlanmış" : "<:cross:999958697310695504> Kapalı",true)

        interaction.reply({embeds:[embed]});
    }
};