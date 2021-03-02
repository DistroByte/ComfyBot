module.exports = {
  config: {
    name: 'emit',
    aliases: [],
    usage: '<event> <params>',
    category: 'owner',
    description: 'Emits a specified event for testing',
    accessableby: 'Owner',
    permissions: 'ADMINISTRATOR',
    args: true,
    hidden: true
  },
  run: async (client, message, args) => {
    if (message.author.id !== client.ownerId) return

    client.emit(args[0], client, args[1])
  }
}