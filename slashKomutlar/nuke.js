const { MessageEmbed,CommandInteraction,Client,Permissions } = require("discord.js");
module.exports = {
    name:"nuke",
    description: 'kanalı yeniden oluşturur',
    type:1,
    options:[],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {

        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});

       let kanal = interaction.channel
       kanal.clone(kanal.name, {reason: "Yeniden oluşturma"}).then(async knl => {
           knl.setPosition(kanal.position);
           kanal.delete();
           knl.send(`kanal yeniden oluşturuldu!`).then( msg => {
               setTimeout( function() {
                   msg.delete();
               },2000
               )
            })
        })
}
};