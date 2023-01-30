const { MessageEmbed,Permissions } = require("discord.js");
const db = require("../models/select-m");
module.exports = {
    name:"menüden-rol-sil",
    description: 'Menüdenrol silersiniz',
    type:'CHAT_INPUT',
    options:[
        {
            name:"rol",
            description:"silinecek rolü seçiniz",
            type:8,
            required: true
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
      if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({content:"Bu komutu kullanamazsın", ephemeral:true})
        const rol = interaction.options.getRole("rol");

        const guildData = await db.findOne({ guildId: interaction.guildId });
        if(!guildData) return interaction.reply("bu sunucu hakkanda veri bulunamadı");

        const guildRoles = guildData.roles;
        const findRole = guildRoles.find((x) => x.roleId === rol.id);
        if(!findRole) return interaction.reply("Bu rol zaten eklenmemiş")

        const filteredRoles = guildRoles.filter((x) => x.roleId !== rol.id)
        guildData.roles = filteredRoles;

        await guildData.save();

        interaction.reply(`Rol Silindi: ${rol.name}`)
    }
};