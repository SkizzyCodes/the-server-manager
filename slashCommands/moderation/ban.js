const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "ban",
   description: "Ban the specified member from the server.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'BanMembers',
   userPerms: 'BanMembers',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
        {
            name: "user",
            description: "Specify a member to ban from the server.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
   run: async (client, interaction, args) => {
     
     try {
     let user = interaction.options.getMember("user");

     await user.ban(user);
     const interface = new EmbedBuilder()
     .setColor(color.success)
     .setDescription(`${icon.success} ***${user.user.tag} has been banned***`)
              interaction.reply({ embeds: [interface] })
       
     } catch (e) {
        const error = new EmbedBuilder()
        .setColor(color.error)
        .setDescription(`${icon.error} ***An error has occured***`)
            return interaction.reply({ embeds: [error] });
        }
   }
};