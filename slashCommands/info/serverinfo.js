const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "serverinfo",
   description: "Displays information about the server you're in.",
   type: ApplicationCommandType.ChatInput,
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   run: async (client, interaction, args) => {

    let owner = await interaction.guild.members.fetch(interaction.guild.ownerId);
    const interface = new EmbedBuilder()
    .setColor(color.default)
    .setAuthor( { name: `${interaction.guild.name} Information` , iconURL: ("https://imgur.com/Noeakrp.png") } )
    .addFields( { name: "Server Name" , value: `${interaction.guild.name}` } )
    .addFields( { name: "Server Identification" , value: `${interaction.guild.id}` } )
    .addFields( { name: "Total Members" , value: `${interaction.guild.memberCount}` } )
    .addFields( { name: 'Total Humans', value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}` }, )
    .addFields( { name: 'Total Applications', value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}` },)
    .addFields( { name: "Server Owner" , value: `<@${owner.user.id}>` } )
    .addFields( { name: "Server Created" , value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>` } )
    .addFields( { name: "Role Count" , value: `${interaction.guild.roles.cache.size}` } )
    .addFields( { name: "Channel Count" , value: `${interaction.guild.channels.cache.size}` } )
    .addFields( { name: "Custom Emoji Count" , value: `${interaction.guild.emojis.cache.size}` } )
    .addFields( { name: "Boost Count" , value: `${interaction.guild.premiumSubscriptionCount}` } )
    interaction.reply( { embeds: [interface] } )

   }
};