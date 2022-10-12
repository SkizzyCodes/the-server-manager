const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const icon = require('../../icons.json');
const color = require('../../colors.json');
const ms = require("ms");
module.exports = {
   name: "timeout",
   description: "Set timeout to a specified member.",
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
            description: "Specify a member to timeout.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "time",
            description: "Specify the amount of time to timeout.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            minValue: 1,
            maxValue: 60,
        },
        {
            name: "unit",
            description: "Choose the time unit.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "seconds", value: "s" },
                { name: "minutes", value: "m" },
                { name: "hours", value: "h" },
                { name: "days", value: "d" },
            ],
        },
    ],
   run: async (client, interaction, args) => {
     
     try {
     let user = interaction.options.getMember("user");

     time = ms(interaction.options.getInteger("time") + interaction.options.getString("unit"));

     time > 2332800000 ? (time = 2332800000) : (time = time);

     await user.timeout(time);
     const interface = new EmbedBuilder()
     .setColor(color.success)
     .setDescription(`${icon.success} ***${user.user.tag} has been timed out for ${ms(time, { long: true})}***`)
              interaction.reply({ embeds: [interface] })
       
     } catch (e) {
        const error = new EmbedBuilder()
        .setColor(color.error)
        .setDescription(`${icon.error} ***An error has occured***`)
            return interaction.reply({ embeds: [error] });
        }
   }
};