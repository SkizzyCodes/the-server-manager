const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "membercount",
   description: "View how many members are in the server.",
   type: ApplicationCommandType.ChatInput,
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   run: async (client, interaction, args) => {

    const interface = new EmbedBuilder()
     .setColor(color.default)
     .setAuthor( { name: "Member Count" , iconURL: ("https://imgur.com/5QTk6GD.png") } )
     .addFields( { name: 'Total Members', value: `${interaction.guild.memberCount}` }, )
     .addFields( { name: 'Humans', value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}` }, )
     .addFields( { name: 'Applications', value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}` },)
    interaction.reply({ embeds: [interface] });

   }
};