const { FetchTimetable } = require('../../utils/FetchRawTimetableData')

module.exports = {
  config: {
    name: 'test',
    aliases: ['tester'],
    category: 'owner',
    description: 'Test command',
    accessableby: 'Owner'
  },
  run: async (client, message, args) => {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    FetchTimetable(args[0], capitalizeFirstLetter(args[1]))
      .then(res => {
        let events = res[0]
        console.log(events.CategoryEvents[0]);
        message.channel.send(events.CategoryEvents[args[2] || 0].ExtraProperties[0].Value)
      })
      .catch(err => {
        console.log(err);
      })
  }
}