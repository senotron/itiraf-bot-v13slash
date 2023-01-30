const ms = require("ms")

module.exports = {
  slash: true,
  enable: true,
  name: "timeout",
  description: 'Üyeye timeout atar/kaldırır',
  options: [
      {
          name: "member", //option ismi
          description: "timeout işlemi uygulanacak üye", //option açıklaması
          type: 6, //option type (Type türleri için: https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
          required: true //optionu doldurmak zorunlu ise true değilse false girin (false yerine bu satırı silebilirsinizde.)
      },
      { //option 2
          name: "time", //option ismi
          description: "Timeout süresi(Örnek- 1m,1h,1d,1w)", //option açıklaması
          type: 3, //option type (Type türleri için: https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
          required: false //optionu doldurmak zorunlu ise true değilse false girin (false yerine bu satırı silebilirsinizde.)
      },
          { //option 3
          name: "sebep", //option ismi
          description: "Timeout sebebi", //option açıklaması
          type: 3, //option type (Type türleri için: https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
          required: false //optionu doldurmak zorunlu ise true değilse false girin (false yerine bu satırı silebilirsinizde.)
      }
    
  ],
 run: async (client, interaction) => {  //her slash commandda burası aynı olmak zorunda
  const member = interaction.options.getMember("member");
  const time = interaction.options.getString("time");
  const sebep = interaction.options.getString("sebep");

  if(!interaction.member.permissions.has("MuteMembers")) return interaction.reply("Bu işlem için üyeleri mutele yetkisine ihtiyacın var!");

  if (member.isCommunicationDisabled()) member.timeout(null), interaction.reply(`${member.user.tag}, adlı kullanıcının zaman aşımı kaldırıldı.`);
  else member.timeout(time ? ms(time) : ms("12h")), interaction.reply(`**<@!${member.user.id}>** adlı kullanıcı timeout yedi! \r\n Sebep: **${sebep}** \r\n Süre: **${time}**`);
},
};