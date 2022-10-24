const Discord = require("discord.js"),
  scheduler = require("node-schedule"),
  Request = require("request-promise"),
  Assignments = require("../base/Assignment"),
  { timeDiff } = require("./functions");

const ReqHeaders = {
  "Authorization": "basic T64Mdy7m[",
  "Content-Type": "application/json; charset=utf-8",
  "credentials": "include",
  "Referer": "https://opentimetable.dcu.ie/",
  "Origin": "https://opentimetable.dcu.ie/"
};

async function FetchModuleNameFromCode(Query) {

  var ReqPayload = {
    method: "POST",
    uri: `https://opentimetable.dcu.ie/broker/api/CategoryTypes/525fe79b-73c3-4b5c-8186-83c652b3adcc/Categories/Filter?pageNumber=1&query=${Query}`,
    headers: ReqHeaders,
    json: true
  };

  return new Promise(function (resolve, reject) {
    Request(ReqPayload) // Send the HTTP Request
      .then(function (res_body) {
        let Results = res_body["Results"];

        if (Results.length == 0) {
          reject("Course identity not found with supplied course code.");
        } else {
          resolve(res_body["Results"][0]["Name"]);
        }
      })
      .catch(function (err) { // Catch any errors
        reject(err);
      });
  });
}

async function FetchAllAssignments() {
  return new Promise((resolve, reject) => {

    let dueAssignments = [];

    Assignments.find({}, (err, docs) => {
      if (err) reject(err);

      for (var i in docs) {
        let ToCheck = docs[i];

        let now = new Date(); now.setHours(now.getHours()); // Daylight Shitty Time made made do this

        ToCheck["Countdown"] = timeDiff(ToCheck.dueDate, now);

        if (ToCheck.dueDate > new Date()) {
          dueAssignments.push(ToCheck);
        }
      }

      dueAssignments.sort((a, b) => {
        return a.dueDate.getTime() - b.dueDate.getTime();
      });

      resolve(dueAssignments);
    });
  });
}

async function UpdateAssignmentsEmbed(client) {
  let assignmentsData = await FetchAllAssignments().catch(err => { console.log(err); });
  if (!assignmentsData) return;

  let comsci1EmbedContent = "";
  let case3EmbedContent = "";

  for (var i in assignmentsData) {
    let NewAssignment = assignmentsData[i];
    let moduleName = NewAssignment.moduleName || await FetchModuleNameFromCode(NewAssignment.moduleCode);
    if (NewAssignment.moduleCode.startsWith("CA3")) {
      case3EmbedContent += `${NewAssignment.assignmentID}. **${NewAssignment.moduleCode} - ${moduleName.slice(9)}**\n${NewAssignment.description}\nDue *${NewAssignment.dueDate.toString().slice(0, "Fri Apr 09 2021 23:59".length)}* - in ${NewAssignment.Countdown}.\n\n`;
    } else {
      comsci1EmbedContent += `${NewAssignment.assignmentID}. **${NewAssignment.moduleCode} - ${moduleName.slice(9)}**\n${NewAssignment.description}\nDue *${NewAssignment.dueDate.toString().slice(0, "Fri Apr 09 2021 23:59".length)}* - in ${NewAssignment.Countdown}.\n\n`;
    }
  }

  try {
    let case3Channel = await client.channels.cache.get("829045215679610891");
    let case3ExistEmbed = await case3Channel.messages.fetch("829045217818574848");
    let fugitivesChannel = await client.channels.cache.get("945506017712697374");
    let fugitivesExistEmbed = await fugitivesChannel.messages.fetch("945507067651825765");
    let comsci1Channel = await client.channels.cache.get("1033055865072263289");
    let comsci1ExistEmbed = await comsci1Channel.messages.fetch("1034253241984241744");


    const case3Embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle("Upcoming Assignments (Earliest due first)")
      .setDescription(case3EmbedContent)
      .setFooter(`Last updated at ${new Date().toString().slice(0, 24)}`);
    // AssignmentsChannel.send(AssignmentEmbed);
    case3ExistEmbed.edit(case3Embed);
    fugitivesExistEmbed.edit(case3Embed);

    const comsci1Embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle("Upcoming Assignments (Earliest due first)")
      .setDescription(comsci1EmbedContent)
      .setFooter(`Last updated at ${new Date().toString().slice(0, 24)}`);
    // AssignmentsChannel.send(AssignmentEmbed);
    comsci1ExistEmbed.edit(comsci1Embed);
  } catch (error) { }
}

async function Initialise(bot) {
  await UpdateAssignmentsEmbed(bot);

  scheduler.scheduleJob("*/1 * * * *", () => {
    UpdateAssignmentsEmbed(bot);
  });
}

module.exports.init = async (bot) => {
  Initialise(bot);
};

module.exports.FetchModuleNameFromCode = async (query) => {
  return FetchModuleNameFromCode(query);
};

module.exports.UpdateAssignmentsEmbed = async (client) => {
  return UpdateAssignmentsEmbed(client);
};