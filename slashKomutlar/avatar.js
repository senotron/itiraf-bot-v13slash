const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed,MessageSelectMenu } = require("discord.js")

module.exports = {
    name:"avatar",
    description: 'Belirtilen kullanıcının Avatarını gösterir',
    type:'CHAT_INPUT',
    category:"genel",
    options: [
        {
            name:"user",
            description:"Kullanıcı Seçin",
            type:6,
        }
        
    ],
  run: async (client, interaction) => {
    const menü = new MessageSelectMenu ()
      .setCustomId("select")
      .setPlaceholder("Bir Boyut Seç")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Sıfırla!",
          value: "sil",
          emoji: "🔄",
        },
        {
          label: "4096",
          value: "4096",
        },
        {
          label: "2048",
          value: "2048",
        },
        {
          label: "1024",
          value: "1024",
        },
        {
          label: "512",
          value: "512",
        },
        {
          label: "256",
          value: "256",
        },
        {
          label: "128",
          value: "128",
        },
        {
          label: "64",
          value: "64",
        },
        {
          label: "32",
          value: "32",
        },
        {
          label: "16",
          value: "16",
        },
      ]);

    const member = interaction.options.getUser("user");
    client.users
      .fetch(
        member?.id || interaction.guild.members.cache.get(interaction.user.id),
        {
          cache: false,
          force: true,
        }
      )
      .then((kullanici) => {
        const embed = new MessageEmbed()
          .setTitle("Linkler ↷")
          .setDescription(
            `**[PNG](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.png?size=256) | [JPG](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.jpg?size=256) | [WEBP](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.webp?size=256) | [GIF](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.gif?size=256)**`
          )
          .setImage(kullanici.avatarURL({ dynamic: true, size: 256 }))
          .setFooter({
            text: `Talep Eden ${interaction.user.username}`,
            iconURL: interaction.user.avatarURL({ dynamic: true }),
          })

        const row = new  MessageActionRow ().addComponents(menü);
        interaction.deferReply();
        interaction.deleteReply();
        interaction.channel
          .send({ embeds: [embed], components: [row] })
          .then(async (msg) => {
            const filter = (x) => x.user.id === interaction.user.id;
            let collector = msg.createMessageComponentCollector({
              filter,
              time: 300000,
            });

            collector.on("collect", async (interaction) => {
              if (!interaction.isSelectMenu()) return;

              let choice = Number(interaction.values[0]);
              if (choice == "sil") {
                msg.delete();
              } else {
                const embed2 = new MessageEmbed()
                  .setTitle("Download Links ↷")
                  .setDescription(
                    `**[PNG](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.png?size=${choice}) | [JPG](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.jpg?size=${choice}) | [WEBP](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.webp?size=${choice}) | [GIF](https://cdn.discordapp.com/avatars/${kullanici.id}/${kullanici.avatar}.gif?size=${choice})**`
                  )
                  .setImage(
                    kullanici.avatarURL({ dynamic: true, size: choice })
                  )
                  .setFooter({
                    text: `Talep Eden ${interaction.user.username}`,
                    iconURL: interaction.user.avatarURL({ dynamic: true }),
                  })

                msg.edit({ embeds: [embed2] });
                interaction.deferUpdate();
              }
            });
          });
      });
  },
};