const ms = require("ms")

module.exports = {
  slash: true,
  enable: true,
  name: "itiraf-yap",
  description: 'İtiraf yaparsın',
  options: [

          { //option 3
          name: "itiraf", //option ismi
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