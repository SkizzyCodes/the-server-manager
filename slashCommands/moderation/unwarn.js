const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
const warnmodal = require('../../modals/warnmodal');
module.exports = {
   name: "unwarn",
   description: "Unwarn a specified user with a unique warn ID",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'Administrator',
   userPerms: 'Administrator',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
    {
        name: "warnid",
        description: "warnId you want to delete",
        type: ApplicationCommandOptionType.String,
        required: true,
    },
],
   run: async (client, interaction, args) => {

    try {
    const warnId = interaction.options.getString("warnid");
    data = await warnmodal.findById(warnId);
    user = interaction.guild.members.cache.get(data.userId);

    await data.delete();
    const interface = new EmbedBuilder()
    .setColor(color.success)
    .setDescription(`${icon.success} ***Unwarned ${user} successfully***`)
    interaction.reply({ embeds: [interface] })

    } catch (e) {
    const error = new EmbedBuilder()
    .setColor(color.error)
    .setDescription(`${icon.error} ***This is not a valid warnID***`)
    return interaction.reply({ embeds: [error] });
}
   }
};