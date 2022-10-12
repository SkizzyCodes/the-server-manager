const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require('../../config.json');
const icon = require('../../icons.json');
const color = require('../../colors.json');
module.exports = {
   name: "addrole",
   description: "Add a role to a specified member.",
   type: ApplicationCommandType.ChatInput,
   botPerms: 'ManageRoles',
   userPerms: 'ManageRoles',
   activation: false,
   maintenance: false,
   nsfw: false,
   developer: false,
   options: [
    {
      name: "user",
      description: "Enter the specified member.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "role",
      description: "Enter the specified role to give to the member.",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
   run: async (client, interaction, args) => {

    try {
    const user = interaction.options.getMember("user");
    role = interaction.options.getRole("role");

    if (user.roles.cache.has(role.id))
    return interaction.reply({content: `${icon.error} ***This user already has the <@&${role.id}> role***`})

    await user.roles.add(role);
    const interface = new EmbedBuilder()
    .setColor(color.success)
    .setDescription(`${icon.success} ***<@&${role.id}> has been added to ${user.user.tag}***`)
    interaction.reply({ embeds: [interface] })

    } catch (e) {
    const error = new EmbedBuilder()
    .setColor(color.error)
    .setDescription(`${icon.error} ***An error has occured***`)
    return interaction.reply({ embeds: [error] });
    }
   }
};