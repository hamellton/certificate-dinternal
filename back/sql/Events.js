// get the client
const mysql = require('mysql2');
const config = require('./config');

// create the connection to database
const pool = mysql.createPool(config);

const promisePool = pool.promise();

const allEvents = async () => {
  const select = 'SELECT * FROM `events`';
  const [rows, fields] = await promisePool.query(select, [], (err, results) => {
    if (err) throw err;
  });
  return rows;
};

const eventByID = async (id) => {
  const select = 'SELECT e.ID, e.name, e.type, e.type_num, e.date, e.date2, e.time, e.duration, e.contents1, e.contents2, e.contents3, s.name AS `speaker`, s.code AS `speaker_code` FROM `events` e LEFT JOIN `speakers` s ON e.speaker_id = s.ID WHERE e.ID = ?';
  const [rows, fields] = await promisePool.query(select, [id], (err, results) => {
    if (err) throw err;
  });
  return rows[0];
};

const IDsByUserID = async (userID) => {
  const select = 'SELECT * FROM `membership` WHERE `user_id` = ?';
  const [rows] = await promisePool.query(select, [userID], (err, results) => {
    if (err) throw err;
  });
  const IDs = rows.map((row) => row.event_id);
  return IDs;
};



const userByGuid = async (guid) => {
  const select = 'SELECT * FROM `users` WHERE `ClientId` = ?';
  const [rows, fields] = await promisePool.query(select, [guid], (err, results) => {
    if (err) throw err;
  });
  return rows[0];
};

const usersByTime = async (time) => {
  let convertTime = new Date(time);
  [convertTime] = convertTime.toISOString().split('T');
  console.log(`convertTime is: ${convertTime}, now is: `);
  const select = 'SELECT * FROM `users` WHERE `Date` >= ?';
  const [rows, fields] = await promisePool.query(select, [convertTime], (err, results) => {
    if (err) throw err;
  });
  return rows;
};

const checkEmailExist = async (email) => {
  const select = 'SELECT * FROM `subscribers` WHERE `email` = ?';
  const [rows, fields] = await promisePool.query(select, [email], (err, results) => {
    if (err) throw err;
  });
  return !!(rows[0]);
};

const updateFront = async (val) => {
  const updateQuery = `UPDATE users SET NameChild = ?, BirthChild = ?, HomeAddress = ?, StudyPlace = ?, IsStudent = ?, ProgramPast = ?, MotherName = ?, MotherEmail = ?,
  MotherPhone = ?, FatherName = ?, FatherEmail = ?, FatherPhone = ?, PersonName = ?, PersonWho = ?, PersonPhone = ?, ActSport = ?, ActArt = ?, ActFootball = ?, ActSwim = ?,
  ActDance = ?, HealthHrono = ?, HealthInfect = ?, HealthSkin = ?, HealthPsycho = ?, HealthPhys = ?, HealthCovid = ?, HealthInfectPast = ?, HealthAllergy = ?, HealthDrugs = ?, HealthBan = ?, HealthElse = ?, HealthFirstAid = ?, Sum = ? WHERE ClientId = ?`;

  // const insert = 'INSERT INTO users(ClientId,Sum,Age,NameCyr,NameLat,Email,Transfer,TransferPoint,TransferPrice,Source) VALUES(?,?,?,?,?,?,?,?,?,?)';
  const [rows, value] = await promisePool.query(updateQuery, [
    val.namecyr,
    val.birth,
    val.adress,
    val.class,
    val.isstudent,
    val.program,
    val.pibmother,
    val.emailmother,
    val.phonemother,
    val.pibfather,
    val.emailfather,
    val.phonefather,
    val.pibperson,
    val.whoperson,
    val.phoneperson,
    val.sport,
    val.art,
    val.football,
    val.swim,
    val.dance,
    val.hrono,
    val.infect,
    val.skin,
    val.psycho,
    val.physic,
    val.covid,
    val.infectpast,
    val.allergy,
    val.drugs,
    val.noproduct,
    val.elseprogram,
    val.firstmedicine,
    val.sum,
    val.guid,
  ], (err, results) => {
    console.log(results);
    if (err) throw err;
  });

  // registrationInfo.totalfeesumm = (+registrationInfo.total + +registrationInfo.fee).toFixed(2);

  return rows;
};

const insertEvent = async (name, type, typeNum, date, date2, time, duration, speakerID, contents1, contents2, contents3) => {
  const insertBack = 'INSERT INTO events(name, type, type_num, date, date2, time, duration, speaker_id, contents1, contents2, contents3) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
  const [value] = await promisePool.query(insertBack, [name, type, typeNum, date, date2, time, duration, speakerID, contents1, contents2, contents3], (err, results) => {
    console.log(results);
    if (err) throw err;
  });

  return value;
};

const updateCRM = async (val) => {
  const update = 'UPDATE users SET Sum = ?,Age = ?,NameCyr = ?,NameLat = ?,Email = ?,Transfer = ?,TransferPoint = ?,TransferPrice = ?,School = ?,Term = ?,Source = ? WHERE ClientId = ?';
  const [value] = await promisePool.query(update, [
    val.Sum,
    val.Age,
    val.NameCyr,
    val.NameLat,
    val.Email,
    val.Transfer,
    val.TransferPoint,
    val.TransferPrice,
    val.School,
    val.Term,
    'crm upd',
    val.ClientId,
  ], (err, results) => {
    console.log(results);
    if (err) throw err;
  });

  return value;
};


const updateInvoiceFront = async (id, invoiceNumber) => {
  const update = 'UPDATE users SET invoiceNumber = ? WHERE ID = ?';
  const [value] = await promisePool.query(update, [
    invoiceNumber,
    id,
  ], (err, results) => {
    console.log(results);
    if (err) throw err;
  });

  return value;
};


module.exports = {
  allEvents,
  usersByTime,
  eventByID,
  IDsByUserID,
  userByGuid,
  updateCRM,
  updateFront,
  updateInvoiceFront,
  insertEvent,
}