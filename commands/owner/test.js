const { sendEmail } = require('../../utils/functions')

module.exports = {
  config: {
    name: 'test',
    aliases: ['tester'],
    usage: '',
    category: 'owner',
    description: 'Test command',
    accessableby: 'Owner'
  },
  run: async (client, message, args) => {

    sendEmail("james.hackett5@mail.dcu.ie", 123, (callback) => {
      console.log(callback.accepted)
    });
  }
}