const { Permissions,Client,CommandInteraction,MessageEmbed } = require("discord.js");
const model = require("../models/guild");
module.exports = {
  name: "küfür-engel",
  description: "Sunucudaki Küfürleri Engeller",
  type:1,
  options: [
    {
      type: 3,
      name: "durum",
      description: "Sistemin Aktif/Pasif Durumunu Ayarlar",
      required: true,
      choices:[{name:"Aktif",value:"aktif"},{name:"Pasif",value:"pasif"}]
    },
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @returns 
   */
  run: async (client, interaction) => { 
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});
    const durum = interaction.options.get("durum").value;
    const guild = interaction.guild;
    if(durum === "aktif"){
      await model.updateOne({GuildID:guild.id},{kfrEngel:true},{upsert:true});
      interaction.reply({ embeds:[new MessageEmbed().setTitle("Küfür Engelleme Sistemi Aktif<:aktif:1026089040522518548>").setColor("GREEN").setDescription(`Küfür Engelleme Sistemi Yönetici Tarafından aktif edildi artık küfürler engellenecek.`)] });
    }else if(durum === "pasif"){
      await model.updateOne({GuildID:guild.id},{kfrEngel:false},{upsert:true});
      interaction.reply({ embeds:[new MessageEmbed().setTitle("Küfür Engelleme Sistemi Pasif<:pasif:1026089042208628836>").setColor("RED").setDescription(`Küfür Engelleme Sistemi Yönetici Tarafından devre dışı bırakıldı artık küfürler engelenmeyecek.`)] });

    }
  }
};