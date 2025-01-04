const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const model = require("../models/guild");

module.exports = {
  name: "confession-admin-channel",
  description: "Confession Settings",
  type: 1,
  options: [
    {
      name: "set",
      description: "Configuration Settings",
      type: 1,
      options: [
        {
          name: "confession_channel",
          description: "Sets the confession channel",
          type: 7,
          required: true,
          channel_types: [0],
        },
      ],
    },
    {
      name: "reset",
      description: "Resets the confession admin channel",
      type: 1,
    },
  ],
  run: async (client, interaction) => {
    const guild = interaction.guild;

    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      interaction.reply({
        content: "You must have `Administrator` permissions to use this command!",
        ephemeral: true,
      });
      return;
    }

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "set": {
        const { confession } = await model.findOne({ GuildID: guild.id }) || {};
        if (!confession)
          return interaction.reply({
            content: "The Confession System is not active.",
            ephemeral: true,
          });

        const confessionChannel = interaction.options.getChannel("confession_channel");
        await model.updateOne(
          { GuildID: interaction.guild.id },
          { confessionAdminChannel: confessionChannel.id },
          { upsert: true }
        );
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("Confession Channel Set!")
              .setColor("GREEN")
              .setDescription(`The confession channel has been set! Channel: <#${confessionChannel.id}>`),
          ],
        });
        break;
      }
      case "reset": {
        const { confession } = await model.findOne({ GuildID: guild.id }) || {};
        if (!confession)
          return interaction.reply({
            content: "The Confession System is not active.",
            ephemeral: true,
          });

        await model.updateOne(
          { GuildID: interaction.guild.id },
          { confessionAdminChannel: null },
          { upsert: true }
        );
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("Confession Channel Reset!")
              .setColor("RED")
              .setDescription("The confession channel has been removed! There is no confession channel in your server now."),
          ],
        });
        break;
      }
    }
  },
};
