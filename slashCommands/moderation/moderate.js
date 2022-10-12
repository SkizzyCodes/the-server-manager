const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');

function new_nick(){
var length = 5,
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
retVal = "";
for (var i = 0, n = charset.length; i < length; ++i) {
retVal += charset.charAt(Math.floor(Math.random() * n));
}
return retVal;
}

module.exports = {
   name: "moderate",
   description: "Moderate a member's inappropriate nickname.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'ManageNicknames',
   userPerms: 'ManageNicknames',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
    {
      name: 'user',
      description: 'Member that you want to moderate username',
      type: ApplicationCommandOptionType.User,
      required: true
    },
  ],
   run: async (client, interaction, args) => {

    try{
    const md_member = interaction.options.getMember('user');
    let md_nickname = new_nick()
    
    md_member.setNickname(`Moderated ${md_nickname}`)
    const interface = new EmbedBuilder()
    .setColor(color.success)
    .setDescription(`${icon.success} ***${md_member.user.tag} has been moderated***`)
    interaction.reply({ embeds: [interface] })

    } catch (e) {
    const error = new EmbedBuilder()
    .setColor(color.error)
    .setDescription(`${icon.error} ***An error has occured***`)
    return interaction.reply({ embeds: [error] });
    }
   }
};