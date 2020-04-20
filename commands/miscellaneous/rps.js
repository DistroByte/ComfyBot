const storage = require("storage-to-json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "rps",
        description: "Play Rock, Paper, Scissors against a computer",
        usage: "(rock/paper/scissors)",
        category: "miscellaneous"
    },
    run: async (bot, message, args) => {
	let rps = ["rock", "paper", "scissors"]
	const leaderboards = new storage(`rpsLeaderboards.json`)

	if (!leaderboards.get(`${message.author.id}`)) {
		leaderboards.set(`${message.author.id}`, `0|0|0`)
	}

	let botChoice = rps[Math.floor(Math.random() * rps.length)];
	let userChoice = args[0] || rps[Math.floor(Math.random() * rps.length)];
	let count = leaderboards.get(`${message.author.id}`).split("|")

	if ((userChoice === "rock" && botChoice === "scissors") || (userChoice === "paper" && botChoice === "rock") || (userChoice === "scissors" && botChoice === "paper")) {
		message.channel.send(`**You Won!** ${userChoice} vs ${botChoice}!`)
		count[0]++
	} else if (userChoice === botChoice) {
		message.channel.send(`**It's a draw!** We both picked ${botChoice}!`)
		count[1]++
	} else {
		message.channel.send(`**You Lost!** ${userChoice} vs ${botChoice}!`)
		count[2]++
	}

	leaderboards.set(`${message.author.id}`, `${count[0]}|${count[1]}|${count[2]}`)
    }
}
