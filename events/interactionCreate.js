const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('../index');
const config = require('../config.json');
const icon = require('../icons.json');

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {




			if (slashCommand.activation) {
				const activation = new EmbedBuilder()
				.setDescription(`${icon.error} ***Command has been disabled by the developers***`)
				return await interaction.reply({ embeds: [activation] }).catch((e) => { console.log(e) });
			}



			if (slashCommand.maintenance){
				const maintenance = new EmbedBuilder()
				.setDescription(`${icon.error} ***Command is currently under maintenance***`)
				return await interaction.reply({ embeds: [maintenance] })
			}





			if (slashCommand.nsfw && !interaction.channel.nsfw) {
				const nsfw = new EmbedBuilder()
				.setDescription(`${icon.error} ***This command can only be used in NSFW channels***`)
				return interaction.reply({ embeds: [nsfw] })
			}




			if (slashCommand.developer) {

			  if (!config.developer.includes(interaction.user.id))
			  return interaction.reply({ content: `${icon.error} ***You are not ${client.user.username}'s developer***`})
			  
			}



			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.cooldown.replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) })
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${icon.error} ***You don't have permission to use this command***`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${icon.error} ***I don't have the \`${slashCommand.botPerms}\` permission***`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}

					await slashCommand.run(client, interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${icon.error} ***You don't have permission to use this command***`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${icon.error} ***I don't have the \`${slashCommand.botPerms}\` permission***`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}
					await slashCommand.run(client, interaction);
			}
		} catch (error) {
				console.log(error);
		}
});