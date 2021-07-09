const { GoogleSpreadsheet, GoogleSpreadsheetRow } = require('google-spreadsheet');
const creds = require('./certificate-sheets-f112ba29ec3f.json');
const sqlEvents = require('../sql/Events');
const sqlUsers = require('../sql/Users');
const { user } = require('../sql/config');
const log = require('../logger/Pino');

let users;
let events;
let newEvents;
let speakers;

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('13JYfK3xNY79YODAiO6m7DN-LXQTZsVNBFoGnJPz55U0');

// // use service account creds
// await doc.useServiceAccountAuth({
//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//   private_key: process.env.GOOGLE_PRIVATE_KEY,
// });

const googleSheetsInit = async () => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  // await doc.updateProperties({ title: 'Users 2020' });
  users = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  events = doc.sheetsByIndex[1];
  newEvents = doc.sheetsByIndex[2];
  speakers = doc.sheetsByIndex[3];

  // adding / removing sheets
  // const newSheet = await doc.addSheet({ title: 'events' });
};


// // OR use API key -- only for read-only access to public sheets
// doc.useApiKey('YOUR-API-KEY');


// await newSheet.delete();

const eventsToGoogle = async () => {
  await googleSheetsInit();
  const eventsDB = await sqlEvents.allEvents();
  const rows = await events.getRows();
  const header = await events.headerValues;
  console.log(header);
  await events.clear();
  await events.setHeaderRow(header);
  for ( event of eventsDB ) {
    await events.addRow(event);
  }

  console.log('eventsToGoogle done!');
};

const eventsFromGoogle = async () => {
  await googleSheetsInit();
  const eventsGoogle = await newEvents.getRows();
  const header = await newEvents.headerValues;
  for ( event of eventsGoogle) {
    await sqlEvents.insertEvent(event.name, event.type, event.type_num, event.date, event.time, event.duration, event.speaker_id);
  }
  await newEvents.clear();
  await newEvents.setHeaderRow(header);
};

const usersFromGoogle = async () => {
  await googleSheetsInit();
  let usersGoogle = await users.getRows();
  const header = await users.headerValues;
  for ( let user of usersGoogle) {
    const userID = await sqlUsers.IDbyEmail(user.email);
    if (userID) {
      await sqlUsers.membership(userID, user.event_id);
      user.status = 'exist';
    } else {
      await sqlUsers.insert(user.name, user.last_name, user.email, user.phone).then(async (userID) => {
        await sqlUsers.membership(userID, user.event_id);
      })
      .catch( (err) => log.info('Error insert User'));
      user.status = 'new';
    }
    // await user.save();
  }
  await users.saveUpdatedCells();

};

module.exports = {
  eventsToGoogle,
  eventsFromGoogle,
  usersFromGoogle,
};
