const model = require("../models/guild");
const klm = require("../models/yasaklıKelime");
const kelimeler = require("../kfr.json");
const linkler = require("../lnks.json");
const {Client,Message,Permissions} = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
    if(message.author.bot) return;
    if(message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return;
    const {kfrEngel,lnkEngl,kelimeEngl} = await model.findOne({ GuildID: message.guild.id }) || { kelimeEngl:false,kfrEngel: false, lnkEngl: false };
    
    if(kfrEngel)
    {
            let blacklist = kelimeler;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
        if (foundInText) 
        {
            message.delete();
            message.channel.send({embeds:[{
            description:`Hey! ${message.author}, ben varken küfür etmene izin vermem!`
                }]
            });
            return;
        }
    }
    if(lnkEngl)
    {
        let blacklist = linkler;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
        if (foundInText) 
        {
            message.delete();
            message.channel.send({embeds:[{
            description:`Hey! ${message.author}, ben varken sunuda reklam yapmana izin vermem!`
                }]
            });
            return;
        }
    }

    if(kelimeEngl)
    {       const {bKlm} = await klm.findOne({ GuildID: message.guild.id }) || {bKlm:null};
            if(!bKlm) return;
            let blacklist = bKlm;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
        if (foundInText) 
        {
            message.delete();
            message.channel.send({embeds:[{
            description:`Hey! ${message.author}, bu kelime bu sunucda yasaklanmış!`
                }]
            });
            return;

        }
    }
}
