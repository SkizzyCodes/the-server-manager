const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "nickname",
   description: "Change nickname of a specified member.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'ManageNicknames',
   userPerms: 'ManageNicknames',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
    {
        name: "user",
        description: "target you want to change the nickname",
        type: ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "nick",
        description: "new nickname",
        type: ApplicationCommandOptionType.String,
        required: true,
    },
],
   run: async (client, interaction, args) => {

    try{
    const user = interaction.options.getMember("user");
    newnick = interaction.options.getString("nick");

    await user.setNickname(newnick);
    const interface = new EmbedBuilder()
    .setColor(color.success)
    .setDescription(`${icon.success} ***${user.user.username}'s nickname has been updated***`)
    interaction.reply({ embeds: [interface] })

    } catch (e) {
    const error = new EmbedBuilder()
    .setColor(color.error)
    .setDescription(`${icon.error} ***An error has occured***`)
    return interaction.reply({ embeds: [error] });
    }
   }
};