const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const model = require("../models/guild");

module.exports = {
    slash: true,
    enable: true,
    name: "make-confession",
    description: "Make a confession",
    options: [
        {
            name: "confession",
            description: "Write your confession",
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.member;
        const confession = interaction.options.getString("confession");

        const { confessionChannel } = (await model.findOne({ GuildID: interaction.guild.id })) || {
            confessionChannel: null
        };
        if (!confessionChannel) return;

        const publicChannel = interaction.guild.channels.cache.get(confessionChannel);
        try {
            publicChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.avatarURL()
                        })
                        .setDescription(
                            `Hey everyone! A new confession just arrived! \r\n ---------- \r\n But I can't tell you who made it. \r\n ---------- \r\n Here's the anonymous confession: \r\n || ${confession} ||`
                        )
                        .setColor("#2ACAEA")
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                ]
            });
        } catch (err) {
            console.error("Failed to send message to public confession channel:", err);
        }

        const { confessionAdminChannel } = (await model.findOne({ GuildID: interaction.guild.id })) || {
            confessionAdminChannel: null
        };
        if (!confessionAdminChannel) return;

        const adminChannel = interaction.guild.channels.cache.get(confessionAdminChannel);
        try {
            adminChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(
                            `Hey admin! A new confession has been submitted! \r\n ---------- \r\n Confession author: ${user} \r\n ---------- \r\n Here's the confession: \r\n || ${confession} ||`
                        )
                        .setColor("#2ACAEA")
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                ]
            });
        } catch (err) {
            console.error("Failed to send message to admin confession channel:", err);
        }

        interaction.reply({ content: `Your confession has been submitted.`, ephemeral: true });
    }
};
