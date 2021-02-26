module.exports = {
  config: {
    name: 'uptime',
    category: 'info',
    description: 'Returns the bot uptime',
    accessableby: 'Members'
  },
  run: async (client, message, args) => {
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days} days, ${hrs} hrs, ${min} mins, ${sec} secs`;
    }

    message.channel.send(`Uptime: \`${duration(client.uptime)}\``)
  }
}