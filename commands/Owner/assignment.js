const Command = require("../../base/Command"),
  { UpdateAssignmentsEmbed, FetchModuleNameFromCode } = require("../../helpers/assignmentsHelper"),
  Assignments = require("../../base/Assignment"),
  Discord = require("discord.js");

class Assignment extends Command {
  constructor(client) {
    super(client, {
      name: "assignment",
      description: "Adds a new assignment to CA Server",
      usage: "([new] [module code] [due date] [due time] [description])/([update/delete] [id])",
      examples: ["{{p}}assignment new CA117 2020-06-27 10:00:00 Final Exam", "{{p}}assignment edit-description 2", "{{p}}assignment edit-date 6", "{{p}}assignment delete 1"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      args: true,
      cooldown: 3000
    });
  }

  /**
  * @param {Discord.Message} message
  * @param {Array} args
  * @param {Object} data
  */
  async run(message, args, data) {
    let allowedGuilds = ["759921793422458901", "1017454386789757040", "781476491895898113", "762742746405535774"];

    if (!allowedGuilds.includes(message.guild.id)) return message.channel.send("This command is only available in certain servers!");
    const AwaitFilter = response => { return response.author.id === message.author.id; };

    let action = args.shift();
    if (action === "new") {
      if (!args[1]) {
        return message.error("Please specify a due date!");
      }

      let ModCode = args[0];
      let DueDate = args[1] + " " + (args[2] ? args[2] : "00:00");
      let ModuleName = await FetchModuleNameFromCode(ModCode)
        .catch(err => {
          message.reply(`Invalid module code provided: ${ModCode}`);
          return;
        });

      let AssignmentID = 0;
      await Assignments.find({}, "assignmentID", function (err, ids) {
        ids.forEach(id => {
          if (id.assignmentID >= AssignmentID) {
            AssignmentID = id.assignmentID;
          }
        });
      });

      if (ModuleName && DueDate && args.length > 3) {
        Assignments.create({ "moduleCode": ModCode, "moduleName": ModuleName, "description": args.slice(3).join(" "), "dueDate": new Date(DueDate), "uploader": message.author.username, "assignmentID": AssignmentID + 1 }, function (err, new_instance) {
          if (err) return console.log(err);
          message.success("New assignment created!");
          UpdateAssignmentsEmbed(message.client);
        });
        return;
      }

      if (ModuleName) {
        message.sendM("Please enter a description for this assignment.", { prefixEmoji: "loading" })
          .then(() => {
            message.channel.awaitMessages(AwaitFilter, { max: 1, time: 30000, errors: ["time"] })
              .then(ConfirmationResponse => {
                let AssignmentDescription = ConfirmationResponse.first().content;
                message.sendM(`Type "confirm" or "cancel" to confirm or cancel this submission: \n**Module Code:** ${ModCode}\n**Module Name:** ${ModuleName}\n**Due Date:** ${DueDate.toString().slice(0, 24)}\n**Description:** ${AssignmentDescription}`, { prefixEmoji: "loading" })
                  .then(() => {
                    message.channel.awaitMessages(AwaitFilter, { max: 1, time: 30000, errors: ["time"] })
                      .then(ConfirmationResponse => {
                        if (ConfirmationResponse.first().content.toLowerCase() != "confirm") return message.error("Confirmation denied - request was not submitted.");

                        Assignments.create({ "moduleCode": ModCode, "moduleName": ModuleName, "description": AssignmentDescription, "dueDate": new Date(DueDate), "uploader": message.author.username, "assignmentID": AssignmentID + 1 }, function (err, new_instance) {
                          if (err) return console.log(err);
                          message.success("New assignment created!");
                          UpdateAssignmentsEmbed(message.client);
                        });
                      })
                      .catch(err => {
                        console.log(err);
                        message.error(`Command timed out. \n ${err}`);
                      });
                  });
              })
              .catch(err => {
                console.log(err);
                message.error(`Command timed out. \n ${err}`);
              });
          });
      }
    }

    if (action == "edit-description") {
      let id = args[0];

      // edit the assignment description with the given id
      Assignments.findOne({ "assignmentID": id }, function (err, assignment) {
        if (err) return console.log(err);
        if (!assignment) return message.error("Assignment not found!");

        message.sendM("Please enter a new description for this assignment.", { prefixEmoji: "loading" })
          .then(() => {
            message.channel.awaitMessages(AwaitFilter, { max: 1, time: 30000, errors: ["time"] })
              .then(ConfirmationResponse => {
                let newDescription = ConfirmationResponse.first().content;
                message.sendM(`**Module Code:** ${assignment.moduleCode}\n**Module Name:** ${assignment.moduleName}\n**Due Date:** ${assignment.dueDate.toString().slice(0, 24)}\n**Description:** ${newDescription}`, { prefixEmoji: "loading" })
                  .then(() => {
                    Assignments.updateOne({ "assignmentID": id }, { "description": newDescription }, function (err, assignment) {
                      if (err) return console.log(err);
                      message.success("Assignment description updated!");
                      UpdateAssignmentsEmbed(message.client);
                    });
                  });
              })
              .catch(err => {
                console.log(err);
                message.error(`Command timed out. \n ${err}`);
              });
          });
      });
    }

    if (action == "edit-date") {
      // eslint-disable-next-line no-unused-vars
      let id = args[0];

      // edit the assignment date with the given ID
      Assignments.findOne({ "assignmentID": id }, function (err, assignment) {
        if (err) return console.log(err);
        if (!assignment) return message.error("Assignment not found.");

        message.sendM("Please enter a new due date.", { prefixEmoji: "loading" })
          .then(() => {
            message.channel.awaitMessages(AwaitFilter, { max: 1, time: 30000, errors: ["time"] })
              .then(ConfirmationResponse => {
                let DueDate = new Date(ConfirmationResponse.first().content);
                message.sendM(`**Due Date:** ${DueDate.toString().slice(0, 24)}`, { prefixEmoji: "loading" })
                  .then(() => {
                    Assignments.updateOne({ "assignmentID": id }, { "dueDate": new Date(DueDate) }, function (err, assignment) {
                      if (err) return console.log(err);
                      message.success("Due date updated!");
                      UpdateAssignmentsEmbed(message.client);
                    });
                  });
              })
              .catch(err => {
                console.log(err);
                message.error(`Command timed out. \n ${err}`);
              });
          });
      });
    }

    if (action == "delete") {
      Assignments.findOneAndDelete({ "assignmentID": args[0] }, function (err, assignment) {
        if (err) return console.log(err);
        if (!assignment) return message.error("Could not find assignment with that ID.");
        message.success("Assignment deleted!");
        UpdateAssignmentsEmbed(message.client);
      });
    }
  }
}

module.exports = Assignment;
