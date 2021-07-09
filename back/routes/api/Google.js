const express = require('express');
const bodyParser = require('body-parser');
const log = require('../../logger/Pino');
// const sqlUsers = require('../../sql/Users');
// const sqlEvents = require('../../sql/Events');
const google = require('../../google/Sheets');

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


router.get('/events', async (req, res) => {
  await google.eventsToGoogle()
    .catch((err) => {
      log.info(`${err}. Events have not uploaded to google`);
      log.error(`${err}. Events have not uploaded to google`);
    });
  res.status(200);
  res.send('done');
  log.info('events uploaded to google sheet events');
});

router.get('/events-google', async (req, res) => {
  await google.eventsFromGoogle();
  res.status(200);
  res.send('done');
  log.info('events inserted to DB events sheet');
});

router.get('/users-google', async (req, res) => {
  await google.usersFromGoogle();
  res.status(200);
  res.send('done');
  log.info('users inserted to DB users sheet');
});

module.exports = router;
