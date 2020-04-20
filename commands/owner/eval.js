const { ownerid } = require("../../botconfig.json");
const { inspect } = require("util")
var { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "eval",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        category: "owner",
        usage: `<input>`
    },
    run: async (bot, message, args) => {
        if (message.author.id == ownerid) {
            try {
                let toEval = args.join(" ")
                let evaluated = inspect(eval(toEval, { depth: 0 }));

                if (!toEval) {
                    return message.channel.send(`Error while evaluating: \`air\``);
                } else {
                    let hrStart = process.hrtime()
                    let hrDiff;
                    hrDiff = process.hrtime(hrStart);
                    return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 }).then(m => m.delete(5000))
                }

            } catch (e) {
                return message.channel.send(`Error while evaluating: \`${e.message}\``);
            }

        } else {
            return message.reply(" you are not the bot owner!").then(msg => msg.delete(5000))
        }
    }
}