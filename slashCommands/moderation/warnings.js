const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const moment = require('moment');
const warnmodal = require('../../modals/warnmodal');
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "warnings",
   description: "View warnings of a specific user.",
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
        description: "Specify a member to view their warnings.",
        type: ApplicationCommandOptionType.User,
        required: true,
    },
],
   run: async (client, interaction, args) => {

    const user = interaction.options.getMember("user") || interaction.user;
    const userWarnings = await warnmodal.find({
    userId: user.id,
    guildId: interaction.guild.id,
    });

    if (!userWarnings.length) {
    const nowarns = new EmbedBuilder()
    .setColor(color.error)
    .setDescription(`${icon.error} ***${user} currently has no warnings***`)
    return interaction.reply({ embeds: [nowarns] });
    }

    const userwarns = userWarnings.map((warn) => {
    const moderator = interaction.guild.members.cache.get(warn.moderatorId);
    return [
    `**Warn ID:** ${warn.id}`,
    `**Moderator:** ${moderator || "Has left" }`,
    `**Date:** ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
    `**Reason:** ${warn.reason}`,].join("\n");}).join("\n\n");
       
    const interface = new EmbedBuilder()
    .setColor(color.default)
    .setAuthor( { name: `${user.user.tag}'s Warnings` } )
    .setDescription(userwarns)
       
    interaction.reply({ embeds: [interface] });
   }
};