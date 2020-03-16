const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!')
    }
})

client.login('Njg0NjUwMjIxMjU0MzQ0NzM1.Xm_G7Q.usuBedj0mhMbSuliEILHucJ5M_w')