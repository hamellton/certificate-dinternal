const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs'); // Or `import fs from "fs";` with ESM
// const path = require('path');
const log = require('../../logger/Pino');
const sqlUsers = require('../../sql/Users');
const sqlEvents = require('../../sql/Events');

const router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/code/:code', (req, res) => {
  // const { code } = req.params;
  // const events = [
  //   {
  //     name: 'Fly high qwerty asdfg zxcvb 12345 Fly high qwerty asdfg zxcvb 12345', type: 'webinar', date: '15.05.2020', speaker: 'Petrechko M.',
  //   },
  // ];

  // if (code === 'de-30-1505202015-0001') {
  //   res.send(events);
  //   log.info('events by code has been send');
  // } else {
  //   log.info('events by code ERROR');
  //   res.send(false);
  // }

  const { code } = req.params;
  const getEvents = async () => {
    const codeArr = code.split('-');
    const userID = codeArr[codeArr.length - 1];
    const eventsIDs = await sqlEvents.IDsByUserID(userID);
    const events = [];
    if (eventsIDs) {
      for ( ID of eventsIDs ) {
        events.push(await sqlEvents.eventByID(ID));
      }
    }
    events.map((item) => {
      const obj = item ? Object.assign(item) : {};
      obj.userID = userID;
      return obj;
    });

    if (events[0]) {
      res.send(events);
      log.info('events by code has been send');
    } else {
      log.info('events by code ERROR');
      res.send(false);
    }
  };
  getEvents();

});

router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  const getEvents = async () => {
    const userID = await sqlUsers.IDbyEmail(email);
    const eventsIDs = await sqlEvents.IDsByUserID(userID);
    const events = [];
    if (eventsIDs) {
      for ( ID of eventsIDs ) {
        events.push(await sqlEvents.eventByID(ID));
      }
    }
    events.map((item) => {
      const obj = item ? Object.assign(item) : {};
      obj.userID = userID;
      return obj;
    });

    if (events[0]) {
      res.send(events);
      log.info('events by email has been send');
    } else {
      log.info('events by email ERROR');
      res.send(false);
    }
  };
  getEvents();

});


module.exports = router;
