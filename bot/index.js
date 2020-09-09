const Discord = require('discord.js')
const request = require('request')
require('dotenv').config()
const client = new Discord.Client()
const allowedRoles = ["444","463","470","472","487","313","430","460","475","488","122","360","462","469"]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    // For Commands given to birb must start with birb
    let toBirb = (msg.content.substr(0, 4)).toUpperCase() === "BIRB"

    // For full message analysis
    let saidNearBirb = msg.content.toUpperCase()

    // For Role
    let roleBirb = msg.content.substr(5, 4).toUpperCase() === "ROLE"
    // For Dropping Role
    let dropBirb = msg.content.substr(5, 4).toUpperCase() === "DROP"
    // For Listing Role Members
    let memberRolesBirb = msg.content.substr(5, 7).toUpperCase() === "MEMBERS"

    // Birb "ing"
    let birbing = msg.content.substr(msg.content.length - 3, msg.content.length) === "ing" && !(msg.author.bot)
    // Birb doesn't like birds
    let noBirds = (saidNearBirb.includes("BIRD") || saidNearBirb.includes("BIRDS"))

    if (birbing && !(msg.author.bot) && toBirb) {
        let birbSay = msg.content
        birbSay = birbSay.slice(5, birbSay.length - 3)
        msg.channel.send(birbSay + "ong")
    }
    else if (noBirds && !(msg.author.bot)) {
        msg.reply("Excuse me, I do not take kindly to hearing myself and my fellow breathern as what you call " +
                         "\"Birds\" would you kindly only refer to us as our preferred name \"Birbs\". Thank you.")
    }
    // ROLES
    else if (toBirb && roleBirb) {
        let roleStr = msg.content.split(" ")[2]
        if (allowedRoles.includes(roleStr)) {
            let role = msg.guild.roles.cache.find(r => r.name.toString() === roleStr)

            let alreadyHas = false
            msg.member.roles.cache.forEach(r => {
                if (!alreadyHas && r === role) {
                    alreadyHas = true
                }
            })
            if (!alreadyHas) {
                msg.member.roles.add(role)
                msg.reply("You have been added to the CMPSC" + roleStr + " class!")
            }
            else {
                msg.reply("You're already in that class!")
            }
        }
        else {
            msg.reply("I'm Sorry... But that is not a valid role I can assign you in this server.\n" +
                      "Ask one of my developers and server admin if you would like to add a class")
        }
    }
    // DROP ROLES
    else if (toBirb && dropBirb) {
        let roleStr = msg.content.split(" ")[2]
        let role = msg.guild.roles.cache.find(r => r.name.toString() === roleStr)
        if (allowedRoles.includes(roleStr)) {
            let alreadyHas = false
            msg.member.roles.cache.forEach(r => {
                if (!alreadyHas && r === role) {
                    alreadyHas = true
                }
            })
            if (alreadyHas) {
                msg.member.roles.remove(role)
                msg.reply("You have dropped the course! I hope you got your money back!")
            }
            else {
                msg.reply("Can't leave a class you're not in you silly!")
            }
        }
        else {
            msg.reply("That isn't a course I can remove you from :(")
        }
    }
    // ROLE Member List
    else if(toBirb && memberRolesBirb){
        let roleStr = msg.content.split(" ")[2]
        if (allowedRoles.includes(roleStr)) {
            let role = msg.guild.roles.cache.find(r => r.name.toString() === roleStr)
            let roleMembers = role.members.map(mem => mem.user.username)
            msg.reply(`Here are the members of ${roleStr}:\n\n` + roleMembers.join("\n"))
        }
    }
    // test the birb with this
    else if (msg.content.toUpperCase() === "BIRB TEST") {
        if ((msg.member.displayName === "I'm still Dade on the Inside") || (msg.member.displayName === "Google")){
            msg.reply("Hello Father")
        }
        else {
            msg.reply("HEY! this command is only for Jacob!")
        }
    }
    else if (msg.content.toUpperCase() === "BIRB HELP") {
        let helpOut = "I see you need help! Here's the list of commands ..."
        helpOut = helpOut + "\n birb [something]ing - example: birb ping ---> \"pong\""
        helpOut = helpOut + "\n birb weather ---> Outputs the weather on campus"
        helpOut = helpOut + "\n birb role [role] ---> Assigns class roles ... classes are as follows"
        helpOut = helpOut + "\n birb drop [role] ---> Removes your role for the class ... classes are as follows"
        allowedRoles.forEach(role => {
            helpOut = helpOut + "\n" + role + "  -  Example: birb role " + role
        })
        helpOut = helpOut + "\n\nDeveloped by: Jacob and Christian"
        msg.reply(helpOut)
    }
    // Birb weather
    else if (msg.content.toUpperCase() === "BIRB WEATHER") {
        let appid = "7cb4eb671c9bca57ec4b4fe34d70dd94"
        let loc = "Harrisburg"
        var options = {
            'method': 'GET',
            'url': 'http://api.openweathermap.org/data/2.5/weather?q=Harrisburg,us&appid=7cb4eb671c9bca57ec4b4fe34d70dd94',
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            const data = JSON.parse(response.body)
            let {temp, feels_like, humidity} = data.main
            const wind = data.wind.speed
            const clouds = data.weather[0].description

            temp = temp - 273.15
            feels_like = feels_like - 273.15

            let birbSay = "Here's the weather on campus! \n " +
                          "The temperature is " + Math.round(temp) + " degrees Celsius "
            if (temp > 30) {
                birbSay = birbSay + "... that's really hot! \n"
            }
            else if (temp < 0) {
                birbSay = birbSay + "... that's really cold! \n"
            }
            else {
                birbSay = birbSay + "\n"
            }

            birbSay = birbSay + "But it really feels like " + Math.round(feels_like) + " degrees Celsius "
            if (temp > feels_like) {
                birbSay = birbSay + "... so a little colder! \n"
            }
            else if (temp < feels_like) {
                birbSay = birbSay + "... so a little warmer! \n"
            }
            else {
                birbSay = birbSay + "... so not much different I suppose...\n"
            }

            birbSay = birbSay + "And the humidity is " + humidity + "% "
            if (humidity > 75) {
                birbSay = birbSay + " disgusting :( \n"
            }
            else {
                birbSay = birbSay + "\n"
            }

            birbSay = birbSay + "And the wind speed is " + wind + "m/s\n"
            birbSay = birbSay + "and the clouds are looking like " + clouds + "\nREMEMBER! Keep on Birbin'"

            msg.reply(birbSay)
        });
    }
    else if (msg.content.toUpperCase() === "BIRBY") {
        msg.reply("Birby was me when I was 10... I'm BIRB NOW!")
    }
    else if (toBirb) {
        msg.reply("Sorry, I don't know what you're talking about\nType \"birb help\" for a list of things I can do for I am only a birb")
    }
})

client.login(process.env.BotToken)