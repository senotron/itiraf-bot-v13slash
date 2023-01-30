const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
module.exports = {
    name:"Sunucu-Bilgi",
    description: 'Sunucu Hakkında Bilgi Verir',
    type:'CHAT_INPUT',
    category:"info",
    options:[],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const level = {
            "TIER_3":"3. Seviye",
            "TIER_2":"2. Seviye",
            "TIER_1":"1. Seviye",
            "NONE":"Seviye Yok"
        }
        const dog = {
            "VERY_HIGH":"Çok Yüksek",
            "HIGH":"Yüksek",
            "MEDIUM":"Orta",
            "LOW":"Düşük",
            "NONE":"Yok"
        }


     const embed = new MessageEmbed()

      .setColor("#2ACAEA")
      .setFooter({
        text:`${interaction.user.tag} Tarafından istendi`,
        iconURL: interaction.user.avatarURL({ dynamic: true })
      }
      )
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addField("Sunucu Adı", interaction.guild.name, true)
      .addField("Sunucu Açıklaması:",
        interaction.guild.description ? `${interaction.guild.description.slice(0,35)}...` : `Yok`,
        true
      )
      .addField("Sunucu ID", interaction.guild.id, true)
      .addField("Sunucu Sahibi", `<@!${interaction.guild.ownerId}>`, true)
      .addField("Takviye Seviyesi",`\`${interaction.guild.premiumSubscriptionCount}\` Boost
        (${interaction.guild.premiumTier ? level[interaction.guild.premiumTier] : '0 Level'})`,
        true
      )
      .addField("Doğrulama Seviyesi",dog[interaction.guild.verificationLevel],true)
      .addField("Özel Davet Linki",`${interaction.guild.vanityURLCode
        ? `discord.gg/${interaction.guild.vanityURLCode}` 
        : "Yok"}`,true)
      .addField("Üye Sayısı", `${interaction.guild.memberCount} üye`, true)
      .addField("Oluşturulma Tarihi",`<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>`,true)
      .addField("Toplam Kanal/Rol Sayısı",`
    \`${interaction.guild.roles.cache.size}\` Rol - \`${
      interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT")
        .size
    }\` Yazı Kanalları - \`${
      interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE")
        .size
    }\` Ses Kanalları - \`${
      interaction.guild.channels.cache.filter(
        (c) => c.type === "GUILD_CATEGORY"
      ).size
    }\` Kategori
    `,
        false
      )

    return await interaction.reply({ embeds: [embed] });
  },
};
