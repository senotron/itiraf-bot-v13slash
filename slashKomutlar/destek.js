const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const db = require("../models/ticket")
module.exports = {
    name:"destek",
    description: 'Destek talebine kullunucu ekler/çıkarır',
    type:'CHAT_INPUT',
    category:"ticket",
    options:[
        {
            name:"seçenek",
            description:"Yapmak istediğiniz işlemi seçiniz",
            type:3,
            required:true,
            choices:[
                {
                 name:"Ekle",
                 value:"ekle"
                },
                {
                 name:"Çıkar",
                 value:"cikar"
                }
            ],
        },
        {
            name:"kullanıcı",
            description:"Kullanıcıyı ekler/çıkarır",
            type:6,
            required:true
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const {guildId,options,channel} = interaction;

        const secim = options.get("seçenek").value;
        const Member = options.getMember("kullanıcı");

        const Embed = new MessageEmbed();

        switch(secim){
            case "ekle":
                db.findOne({GuildID: guildId, ChannelID: channel.id}, async (err,docs) => {
                    if(err) throw err;
                    if(!docs) return interaction.reply({
                        embeds:[Embed.setDescription("Bu kanalda destek talebi bulunmamaktadır.<:cross:999958697310695504>").setColor("RED")],
                        ephemeral:true
                    });


                    if(docs.MembersID.includes(Member.id))
                    return interaction.reply({content:"Bu kullanıcı zaten destek talebinde ekli<:cross:999958697310695504>", ephemeral:true});

                    docs.MembersID.push(Member.id);
                    channel.permissionOverwrites.edit(Member.id,{
                        SEND_MESSAGES:true,
                        VIEW_CHANNEL:true,
                        ATTACH_FILES:true,
                        READ_MESSAGE_HISTORY:true
                    })
                    interaction.reply({embeds:[
                        Embed.setColor("GREEN")
                        .setDescription(`${Member} adlı kullanıcı destek talebinde eklendi<:join:999958953049993276>`)
                    ]});
                    docs.save();
                })
                break;
            case "cikar":
                db.findOne({GuildID: guildId, ChannelID: channel.id}, async (err,docs) => {
                    if(err) throw err;
                    if(!docs) return interaction.reply({
                        embeds:[Embed.setDescription("Bu kanalda destek talebi bulunmamaktadır.<:cross:999958697310695504>").setColor("RED")],
                        ephemeral:true
                    });


                    if(!docs.MembersID.includes(Member.id))
                    return interaction.reply({content:"Bu kullanıcı zaten destek talebinde değil<:cross:999958697310695504>", ephemeral:true});

                    docs.MembersID.remove(Member.id);
                    channel.permissionOverwrites.edit(Member.id,{
                        VIEW_CHANNEL:false,
                    })
                    interaction.reply({embeds:[
                        Embed.setColor("GREEN")
                        .setDescription(`${Member} adlı kullanıcı destek talebindem kaldırıldı<:leave:999958727249641492>`)
                    ]});
                    docs.save();
                })
                break;
                default:
                    interaction.reply("boş")
                    break;


        }
}
};