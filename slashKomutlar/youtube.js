const Discord = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
name: "youtube",
description: "Seste YouTube açarsınız.",
 run: async (client, message, args) => {
       
if(!message.member.voice.channel) return message.reply('Bir ses kanalında değilsin.')

fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
method: "POST",
body: JSON.stringify({
max_age: 86400,
max_uses: 0,
target_application_id: "880218394199220334",
target_type: 2,
temporary: false,
validate: null
}),
headers: {
"Authorization": `Bot ${client.token}`,
"Content-Type": "application/json"
}
})
.then(t => t.json())
.then(invite => {
      
let embed = new Discord.MessageEmbed()
.addField(`YouTube`,`[Açmak İçin Tıkla](https://discord.gg/${invite.code})`)
message.channel.send({embeds: [embed]});
})
}
}