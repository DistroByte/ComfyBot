const storage = require("storage-to-json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "messagecount",
        description: "Returns the number of messages since bot started counting per user",
        category: "moderation",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
	if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

	const count = new storage(`${message.guild.id}`)
	let embed = new MessageEmbed()
		.setTitle(`Message Count for ${message.guild.name}`)
		.setColor("GREEN")
		.setThumbnail(message.guild.iconURL)
		.setFooter(`© ${message.guild.me.displayName} | Developed By JammyGamer`, bot.user.displayAvatarURL)
		.setTimestamp()

	let regexTotal = /Total/;
	let date = new Date().toString().slice(4, 24);
	let runningTotal = 0;
	let oldTotal = count.get("Total").slice(20)
	let lastDate
	let messageCount = count.each(function(value, key) {
		if (!regexTotal.test(key)) {
			let userKey
			if (bot.users.get(key)) {
				userKey = bot.users.get(key).username
			} else {
				userKey = key
			}
			embed.addField(`${userKey}`, `Messages sent: \`${value}\``, true)
			runningTotal += value
		}
		if (regexTotal.test(key)) {
			lastDate = value.slice(0, 20)
		}
	})
	embed.setDescription(`Current time and date: ${date}\nTotal messages since ${lastDate}: \`${runningTotal - oldTotal}\`\nTotal messages on server: \`${runningTotal}\``)
	count.set(`Total`, `${date} ${runningTotal}`)
	message.channel.send(embed);
    }
}
