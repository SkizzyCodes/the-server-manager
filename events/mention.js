const client = require('../index');
client.on("messageCreate", message => {   
if(message.content === `<@${client.user.id}>`) {   message.reply({ content: `**Welcome im ${client.user.tag} My Prefix is /**`})    } });