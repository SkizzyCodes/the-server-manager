const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
const warnModal = require('../../modals/warnmodal');
module.exports = {
   name: "warn",
   description: "Warn a specific user when they break the rules.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'Administrator',
   userPerms: 'Administrator',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
    {
        name: "user",
        description: "user to warn",
        type: ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "reason",
        description: "reason for this warn",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
],
   run: async (client, interaction, args) => {

    try {
    const user = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No Reason Provided";

    await new warnModal({
        userId: user.id,
        guildId: interaction.guildId,
        moderatorId: interaction.user.id,
        reason,
        timestamp: Date.now(),
        }).save();

        const interface = new EmbedBuilder()
        .setColor(color.success)
        .setDescription(`${icon.success} ***${user} has been warned for ${reason}***`)
        interaction.reply({ embeds: [interface] })

    } catch (e) {
        const error = new EmbedBuilder()
        .setColor(color.error)
        .setDescription(`${icon.error} ***An error has occured***`)
        return interaction.reply({ embeds: [error] });
        }
   }
};