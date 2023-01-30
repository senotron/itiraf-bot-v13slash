const { Client,CommandInteraction,MessageEmbed,MessageActionRow, MessageSelectMenu ,Permissions} = require("discord.js");
const db = require("../models/select-m");
module.exports = {
    name:"menülü-rol-alma",
    description: 'Menülü rol alma paneli gönderir',
    type:'CHAT_INPUT',
    options:[],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({content:"Bu komutu kullanamazsın", ephemeral:true})
        const guildData = await db.findOne({ guildId: interaction.guildId });
        if(!guildData?.roles) return interaction.reply("bu sunucu hakkanda veri bulunamadı");

        const options = guildData.roles.map(x => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.rolAcıklama || "Açıklama Belirtilmedi",
                emoji: x.rolEmoji
            };
        });

        const panelEmbed = new MessageEmbed()
        .setTitle("Lütfen Rol Seçiniz")
        .setColor("AQUA")

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId('reaction-roles')
                .setMaxValues(1)
                .addOptions(options)
            )
        ];
        await interaction.reply({content:"Gönderildi"});
        interaction.channel.send({embeds:[panelEmbed], components});
    }
};