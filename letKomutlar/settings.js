const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const model = require("../models/guild");

module.exports = {
    name: "confession",
    description: "Confession Settings",
    type: 1,
    options: [
        {
            type: 1,
            name: "status",
            description: "Set the system to Active/Inactive",
            options: [
                {
                    name: "system-status",
                    required: true,
                    description: "Set the system status",
                    type: 3,
                    choices: [
                        { name: "Active", value: "active" },
                        { name: "Inactive", value: "inactive" }
                    ]
                }
            ]
        },
        {
            name: "set-channel",
            description: "Set confession channel",
            type: 1,
            options: [
                {
                    name: "confession_channel",
                    description: "Set the confession channel",
                    type: 7,
                    required: true,
                    channel_types: [0]
                }
            ]
        },
        {
            name: "reset-channel",
            description: "Reset confession channel",
            type: 1
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const guild = interaction.guild;

        // Check for Administrator permissions
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            interaction.reply({
                content: "You must have `Administrator` permissions to use this command!",
                ephemeral: true
            });
            return;
        }

        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "status": {
                const status = interaction.options.get("system-status").value;

                if (status === "active") {
                    await model.updateOne(
                        { GuildID: guild.id },
                        { confessionSystem: true },
                        { upsert: true }
                    );
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Confession System Activated <:active:1026089040522518548>")
                                .setColor("GREEN")
                                .setDescription(
                                    "The Confession System has been activated by an admin. Members can now share their confessions anonymously and securely.\n*Confessions will only be visible to server admins."
                                )
                        ]
                    });
                } else if (status === "inactive") {
                    await model.updateOne(
                        { GuildID: guild.id },
                        { confessionSystem: false },
                        { upsert: true }
                    );
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Confession System Deactivated <:inactive:1026089042208628836>")
                                .setColor("RED")
                                .setDescription(
                                    "The Confession System has been deactivated by an admin."
                                )
                        ]
                    });
                }
                break;
            }

            case "set-channel": {
                const { confessionSystem } = await model.findOne({ GuildID: guild.id }) || {};
                if (!confessionSystem) {
                    return interaction.reply({
                        content: "The Confession System is not active.",
                        ephemeral: true
                    });
                }

                const confessionChannel = interaction.options.getChannel("confession_channel");
                await model.updateOne(
                    { GuildID: interaction.guild.id },
                    { confessionChannel: confessionChannel.id },
                    { upsert: true }
                );
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Confession Channel Set!")
                            .setColor("GREEN")
                            .setDescription(
                                `The confession channel has been set to: <#${confessionChannel.id}>`
                            )
                    ]
                });
                break;
            }

            case "reset-channel": {
                const { confessionSystem } = await model.findOne({ GuildID: guild.id }) || {};
                if (!confessionSystem) {
                    return interaction.reply({
                        content: "The Confession System is not active.",
                        ephemeral: true
                    });
                }

                await model.updateOne(
                    { GuildID: interaction.guild.id },
                    { confessionChannel: null },
                    { upsert: true }
                );
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Confession Channel Reset!")
                            .setColor("RED")
                            .setDescription(
                                "The confession channel has been reset. Your server no longer has a confession channel."
                            )
                    ]
                });
                break;
            }
        }
    }
};
