const { MessageEmbed, Client, CommandInteraction,MessageButton,MessageActionRow } = require("discord.js");

const bilgiler = [
    "Futbol oyuncularının çoğu, bir maç sırasında ortalama 11 km koşar.", 
    "Yalnızca tavşanlar ve papağanlar, kafalarını çevirmeden arkalarını görebilirler.",
    "Su aygırları üzüldüklerinde terleri kırmızı renk alır.",
    "Her hapşırıkta, beyin hücrelerinin bir kısmı ölür.",
    "Gülmek, stres hormonunu azaltır ve bağışıklık sistemini güçlendirir. 6 yaşındaki bir çocuk günde ortalama 300 kez gülerken, yetişkinler yalnızca 15-100 kez gülerler.",
    "Soğan doğrarken sakız çiğnerseniz ağlamazsınız.",
    "Hapşırırken burnunuzu ve ağzınızı aynı anda asla kapamayın; gözleriniz yerinden çıkabilir.",
    "Madison'daki bir matematik öğretmeninin sahip olduğu dünyanın en zeki domuzu çarpım tablosunu 12'lere kadar ezberlemişti.",
    " Antik Yunan'da zengin aile çocukları hayatları boyunca kılsız olmaları için doğdukları anda zeytinyağına batırılırlardı..",
    "Dünyanın en geniş yolu olan Brezilya'daki Anıtsal Eksen'de 160 araba yan yana gidebilir.",
    "Japon balıklarının hatırlama ömürleri yaklaşık 3 saniyedir.",
    "Gıda renklendiricileri eklenmeseydi eğer, kolanın rengi yeşil olurdu."
]
module.exports = {
  name: "ilginç-bilgiler",
  description: "İlginç bilgiler",
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const user = interaction.member.user
        const Embed = new MessageEmbed();



    const bilgi = bilgiler[Math.floor(Math.random() * bilgiler.length)]

    const workEmbed = new MessageEmbed()
        .setDescription(`**\ ${bilgi} \** `)
        .setColor("RANDOM")

    interaction.reply({
      embeds: [workEmbed],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("random-hesap")
            .setEmoji("🔄")
            .setLabel("Yenile")
            .setStyle("PRIMARY")
        ),
      ],
      
    });

    

  }, 
};













