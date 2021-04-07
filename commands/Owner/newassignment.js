const Command = require("../../base/Command"),
  { UpdateAssignmentsEmbed, FetchModuleNameFromCode } = require('../../helpers/assignments'),
  Assignments = require('../../base/Assignment');

class NewAssignment extends Command {
  constructor(client) {
    super(client, {
      name: "newassignment",
      description: "Adds a new assignment to CA Server",
      usage: "[module code] [due date] [due time] [description]",
      examples: ["{{p}}newassignment CA117 2020-06-27 10:00:00 Final Exam"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: true,
      args: true,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    const AwaitFilter = response => {
      return response.author.id === message.author.id;
    };

    if (!args[1]) {
      return message.channel.send("Please specify a due date!");
    }

    let ModCode = args[0]
    let DueDate = args[1] + " " + (args[2] ? args[2] : "00:00")
    let ModuleName = await FetchModuleNameFromCode(ModCode)
      .catch(err => {
        message.reply(`Invalid module code provided: ${ModCode}`)
        return;
      })

    if (ModuleName) {
      message.channel.send(`Please enter a description for this assignment.`)
        .then(() => {
          message.channel.awaitMessages(AwaitFilter, { max: 1, time: 30000, errors: ['time'] })
            .then(ConfirmationResponse => {
              let AssignmentDescription = ConfirmationResponse.first().content
              message.channel.send(`Type "confirm" or "cancel" to confirm or cancel this submission: \n**Module Code:** ${ModCode}\n**Module Name:** ${ModuleName}\n**Due Date:** ${DueDate.toString().slice(0, 24)}\n**Description:** ${AssignmentDescription} `)
                .then(() => {
                  message.channel.awaitMessages(AwaitFilter, { max: 1, time: 30000, errors: ['time'] })
                    .then(ConfirmationResponse => {
                      if (ConfirmationResponse.first().content.toLowerCase() != 'confirm') return message.channel.send('Confirmation denied - request was not submitted.', 0xff2b2b);
                      Assignments.create({ "moduleCode": ModCode, "moduleName": ModuleName, "description": AssignmentDescription, "dueDate": new Date(DueDate), "uploader": message.author.username }, function (err, new_instance) {
                        if (err) return console.log(err);
                        message.channel.send('New assignment created.')
                        UpdateAssignmentsEmbed(message.client)
                      });
                    })
                    .catch(err => {
                      console.log(err)
                      message.channel.send(`Command timed out. \n ${err}`);
                    });
                });
            })
            .catch(err => {
              console.log(err)
              message.channel.send(`Command timed out. \n ${err}`);
            });
        });
    }
  }
}

module.exports = NewAssignment;