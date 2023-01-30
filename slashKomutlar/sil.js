const { Permissions,Client,CommandInteraction } = require("discord.js");

module.exports = {
  name: "sil",
  description: "Beliritlen Miktarda Mesajı siler",
  type:1,
  options: [
    {
      type: 4,
      name: "miktar",
      description: "Kaç Mesaj silinicek?",
      required: true,
    },
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @returns 
   */
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});
    const clear = interaction.options.getInteger("miktar");
    const channel = interaction.channel;

    let math = Math.floor(clear / 100);
    for (let i = 0; i < math; i++) {
      try {
        await channel.bulkDelete(100);
      } catch (err) {}
    }

    try {
      await channel.bulkDelete(clear - 100 * math);
    } catch (err) {}

    try {
        interaction.reply({ content: `${clear} adet mesajı sildim<:sil:1026088939284598834>` });
        setTimeout(() => {
      interaction.deleteReply();
        }, 5000);
    } catch {}
  },
};