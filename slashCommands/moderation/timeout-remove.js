const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "timeout-remove",
   description: "Remove timeout to a specified member.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'ModerateMembers',
   userPerms: 'ModerateMembers',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
        {
            name: "user",
            description: "Specify a member to remove timeout.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
   run: async (client, interaction, args) => {
     
     try {
     let user = interaction.options.getMember("user");

     await user.timeout(null);
     const interface = new EmbedBuilder()
     .setColor(color.success)
     .setDescription(`${icon.success} ***${user.user.username}'s timeout has been removed ***`)
              interaction.reply({ embeds: [interface] })
       
     } catch (e) {
        const error = new EmbedBuilder()
        .setColor(color.error)
        .setDescription(`${icon.error} ***An error has occured***`)
            return interaction.reply({ embeds: [error] });
        }
   }
};