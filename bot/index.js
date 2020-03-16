const Discord = require('discord.js')
const request = require('request')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    // For Commands given to birb must start with birb
    let toBirb = (msg.content.substr(0, 4)).toUpperCase() === "BIRB"

    // For full message analysis
    let saidNearBirb = msg.content.toUpperCase()

    // Birb "ing"
    let birbing = msg.content.substr(msg.content.length - 3, msg.content.length) === "ing" && !(msg.author.bot)
    // Birb doesn't like birds
    let noBirds = (saidNearBirb.includes("BIRD") || saidNearBirb.includes("BIRDS"))

    if (birbing && !(msg.author.bot) && toBirb) {
        let birbSay = msg.content
        birbSay = birbSay.slice(5, birbSay.length - 3)
        msg.channel.send(birbSay + "ong")
    }

    if (noBirds && !(msg.author.bot)) {
        msg.reply("Excuse me, I do not take kindly to hearing myself and my fellow breathern as what you call " +
                         "\"Birds\" would you kindly only refer to us as our preferred name \"Birbs\". Thank you.")
    }

    if (msg.content === "hey birb") {
        let appid = "7cb4eb671c9bca57ec4b4fe34d70dd94"
        let loc = "Harrisburg"
        let options = {
            'method': 'GET',
            'url': encodeURI('http://api.openweathermap.org/data/2.5/weather?q=Harrisburg,us&appid=7cb4eb671c9bca57ec4b4fe34d70dd94'),
            'headers': {
            }
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });

        const data = body
        const {temp, feels_like, humidity} = data.main
        const wind = data.wind.speed

        let birbSay = "Here's the weather! " + temp + " " + feels_like + " " + humidity + " " + wind
        msg.reply(birbSay)

    }




})

client.login('Njg0NjUwMjIxMjU0MzQ0NzM1.Xm_JeA.jz2RAdPmOWAK6LJelpAB5cvQGqg')