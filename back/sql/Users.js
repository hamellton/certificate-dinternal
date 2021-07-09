// get the client
const mysql = require('mysql2');
const config = require('./config');

// create the connection to database
const pool = mysql.createPool(config);

const promisePool = pool.promise();

const users = async () => {
  const select = 'SELECT * FROM `users`';
  const [rows, fields] = await promisePool.query(select, [], (err, results) => {
    if (err) throw err;
  });
  return rows;
};

const userByID = async (id) => {
  const select = 'SELECT * FROM `users` WHERE `ID` = ?';
  const [rows, fields] = await promisePool.query(select, [id], (err, results) => {
    if (err) throw err;
  });
  return rows[0];
};

const IDbyEmail = async (email) => {
  const select = 'SELECT ID FROM `users` WHERE `email` = ?';
  const [rows, fields] = await promisePool.query(select, [email], (err, results) => {
    if (err) throw err;
  });
  return rows[0] ? rows[0].ID : false;
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
  const select = 'SELECT email FROM `users` WHERE `email` = ?';
  const [rows, fields] = await promisePool.query(select, [email], (err, results) => {
    if (err) throw err;
  });
  return !!(rows[0]);
};

const membership = async (userID, eventID) => {
  const insertBack = 'INSERT IGNORE INTO membership(user_id, event_id) VALUES(?,?)';
  const [value] = await promisePool.query(insertBack, [Number(userID), Number(eventID)], (err, results) => {
    console.log()
    console.log(eventID);
    if (err) throw err;
  });

  return value;
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

const insert = async (name, lastName, email, phone) => {
  const insertBack = 'INSERT INTO users(name, last_name, email, phone) VALUES(?,?,?,?)';
  const [value] = await promisePool.query(insertBack, [name, lastName, email, phone], (err, results) => {
    if (err) throw err;
  });

  return value.insertId;
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
  users,
  usersByTime,
  userByID,
  IDbyEmail,
  userByGuid,
  updateCRM,
  updateFront,
  updateInvoiceFront,
  insert,
  membership,
  checkEmailExist,
}