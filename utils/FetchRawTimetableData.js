const Request = require('request-promise')

/**
 * This script sends a POST request to the opentimetable endpoint to fetch classes
 * Then stores relevant info for each class in an object, and finally stores each object in one array and resolves it
 * 
 * @author Hamzah Zahoor
 * 
*/

//

const Weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] // Used to fetch the index for a day

const ReqHeaders = {
  "Authorization": "basic T64Mdy7m[",
  "Content-Type": "application/json; charset=utf-8",
  "credentials": "include",
  "Referer": "https://opentimetable.dcu.ie/",
  "Origin": "https://opentimetable.dcu.ie/"
}

//

function StartOfWeek(DateToFetch) {
  var CurrentDate = DateToFetch
  var DateDifference = CurrentDate.getDate() - CurrentDate.getDay() + (CurrentDate.getDay() === 0 ? -6 : 1);

  FirstDayInWeek = new Date(CurrentDate.setDate(DateDifference)).toISOString() // Convert our date to ISOString
  return FirstDayInWeek.slice(0, -14).concat("T00:00:00.000Z") // Slice the date and add a time for midnight to the end
  // Outputs: YYYY-MM-DDT00:00:00.000Z
}

function ConstructRequestBody(Day, DateToFetch, CourseIdentity) {
  let RequestBodyTemplate = require('./body.json')

  FinalDayNumber = Weekdays.indexOf(Day) + 1

  RequestBodyTemplate['ViewOptions']['Weeks'][0]['FirstDayInWeek'] = StartOfWeek(DateToFetch)
  RequestBodyTemplate['ViewOptions']['Days'][0]['Name'] = Day
  RequestBodyTemplate['ViewOptions']['Days'][0]['DayOfWeek'] = Weekdays.indexOf(Day) + 1

  RequestBodyTemplate['CategoryIdentities'][0] = CourseIdentity

  return RequestBodyTemplate
}

async function FetchCourseCodeIdentity(Query) {

  var ReqPayload = {
    method: 'POST',
    uri: `https://opentimetable.dcu.ie/broker/api/CategoryTypes/241e4d36-60e0-49f8-b27e-99416745d98d/Categories/Filter?pageNumber=1&query=${Query}`,
    headers: ReqHeaders,
    json: true
  };

  return new Promise(function (resolve, reject) {
    Request(ReqPayload) // Send the HTTP Request
      .then(function (res_body) {
        let Results = res_body['Results']

        if (Results.length == 0) {
          reject('Course identity not found with supplied course code.')
        } else {
          resolve(res_body['Results'][0]['Identity'])
        }
      })
      .catch(function (err) { // Catch any errors
        reject(err)
      });
  })
}

async function FetchRawTimetableData(CourseCode, Day, DateToFetch = new Date()) {

  let CourseIdentity = await FetchCourseCodeIdentity(CourseCode);

  return new Promise(function (resolve, reject) {
    const ReqPayload = {
      method: 'POST',
      uri: 'https://opentimetable.dcu.ie/broker/api/categoryTypes/241e4d36-60e0-49f8-b27e-99416745d98d/categories/events/filter',
      headers: ReqHeaders,
      body: ConstructRequestBody(Day, DateToFetch, CourseIdentity),
      json: true
    };

    Request(ReqPayload) // Send the HTTP Request
      .then(function (res_body) {
        resolve(res_body)
      })
      .catch(function (err) { // Catch any errors
        reject(err)
      });
  })
}

module.exports = {
  FetchTimetable: FetchRawTimetableData
}