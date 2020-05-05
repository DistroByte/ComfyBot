module.exports = (bot) => {
	console.log(
		`${bot.user.username} is online: ${new Date().toString().slice(4, 24)}`
	);

	let activities = [
			`${bot.guilds.cache.size} servers!`,
			`${bot.channels.cache.size} channels!`,
			`${bot.users.cache.size} users!`,
		],
		i = 0;
	setInterval(
		() =>
			bot.user.setActivity(
				`${bot.prefix}help | ${activities[i++ % activities.length]}`,
				{ type: 'WATCHING' }
			),
		15000
	);
};
