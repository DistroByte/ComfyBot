const store = require("storage-to-json")
const correct = new store('correct.json')
const { RichEmbed } = require("discord.js")
const { ownerid } = require("../../botconfig.json")

module.exports = {
    config: {
        name: "correctall",
        description: "Replies with a correction to a message",
        usage: "",
        category: "owner",
        accessableby: "Owner"
    },
    run: async (bot, message, args) => {
        if (message.author.id !== ownerid) return message.channel.send("You're not an admin, nice try though :P").then(m => m.delete(5000))

        let first = args[0].toLowerCase()
        let second = message.content.split(' ').splice(2).join(' ')

        if (!correct.get(first)) {
            let sEmbed = new RichEmbed()
                .setColor('BLUE')
                .setTitle("Created!")
                .setDescription(`I will now correct everyone saying **${first}** with **${second}**`);

            message.channel.send(sEmbed);

            return correct.set(first, second);
        }

    }
}
