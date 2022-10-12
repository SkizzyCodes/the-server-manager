/*const client = require('..');
const config = require('../config.json')
client.on('ready', async (menu) => {
const channel = config.autoreactchannel
const emojis = ["😳" , "😍", "🤪"]
client.on("messageCreate", message =>{
if(channel.includes(message.channel.id)){
message.react(emojis[rn(0, emojis.length)])}
})
})

function rn(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
}*/

const client = require('../index');
const config = require('../config.json')
client.on('ready', async (menu) => {
const channel = config.autoreactchannel
client.on("messageCreate", message =>{
if(channel.includes(message.channel.id)){
message.react("👍")
message.react("👎")
}
})
})