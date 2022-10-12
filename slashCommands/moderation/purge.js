const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "purge",
   description: "Delete a specific amount of messages.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'ManageMessages',
   userPerms: 'ManageMessages',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
    {
        name: "amount",
        description: "Specify the number of messages you wish to delete.",
        type: ApplicationCommandOptionType.Integer,
        minValue: 1,
        maxValue: 100,
        required: true,
    },
],
   run: async (client, interaction, args) => {
    const amount = interaction.options.getInteger('amount');
    interaction.channel.bulkDelete(amount, true);
    const interface = new EmbedBuilder()
    .setColor(color.success)
    .setDescription(`${icon.success} ***Successfully deleted ${amount} messages***`)
    interaction.reply({ embeds: [interface] })
   }
};