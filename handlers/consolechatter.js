module.exports = (bot) => {
	let prompt = process.openStdin();
	prompt.addListener('data', (res) => {
		let x = res.toString().trim().split(/ +/g);
		bot.channels.cache.get('687688180597653639').send(x.join(' '));
	});
};
