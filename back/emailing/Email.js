const email = require('./config');
const log = require('../logger/Pino');

// const sendEmail = (useremail, name, details) => {
//   email.send({
//     template: 'hello',
//     message: {
//       from: 'ILAC <ilacregistration@ukr.net>',
//       to: useremail,
//       // cc: 'ilacregistration@ukr.net',
//     },
//     locals: {
//       fname: name,
//       details,
//     },
//   }).then(() => console.log(`email has been send to ${useremail}!`));
// };

const sendEmailPaid = (useremail, name) => {
  email.send({
    template: 'successPaid',
    message: {
      from: 'ILAC <ilacregistration@ukr.net>',
      to: useremail,
      // cc: 'ilacregistration@ukr.net',
      attachments: [{
        filename: 'ticket.pdf',
        path: `pdfReceipts/${useremail}.pdf`,
      }],
    },
    locals: {
      fname: name,
    },
  }).then(() => console.log('emailPaid has been send!'));
};

const sendCertificate = (useremail, certificateCode, event) => {
  email.send({
    template: 'certificate',
    message: {
      // from: 'Dinternal Education <elt.dinternal@gmail.com>',
      from: 'Dinternal Education <dinternal.certificate@gmail.com>',
      to: useremail,
      attachments: [{
        filename: `${certificateCode}.pdf`,
        path: `certificate/${certificateCode}.pdf`,
      },
      ],
    },
    locals: {
      code: certificateCode,
      event,
      // center,
    },
  }).then(() => log.info(`Certificate has been send to user's email ${useremail}`))
    .catch((err) => log.error(`Error to send certificate ${err}`));
};
const sendTest = (useremail, certificateCode, event) => {
  email.send({
    template: 'certificate',
    message: {
      // from: 'Dinternal Education <elt.dinternal@gmail.com>',
      from: 'Dinternal Education <dinternal.certificate@gmail.com>',
      to: useremail,
      attachments: [{
        filename: `${certificateCode}.pdf`,
        path: `certificate/${certificateCode}.pdf`,
      },
      ],
    },
    locals: {
      code: certificateCode,
      event,
      // center,
    },
  }).then(() => log.info(`Certificate has been send to user's email hamellton@ukr.net`))
    .catch((err) => log.error(`Error to send certificate ${err}`));
};

const sendEmail = (useremail, name, value) => {
  email.send({
    template: 'registration',
    message: {
      from: 'Адміністрація London School of English <camp@lse.ua>',
      to: useremail,
      cc: 'camp@lse.ua',
      attachments: [{
        filename: 'oferta_rules.pdf',
        path: `docs/oferta_rules_${value.term}.pdf`,
      },
      ],
    },
    locals: {
      fname: name,
      // center,
    },
  }).then(() => console.log(`Email has been send to candidate: ${name}, ${useremail}`));
};

const sendNotificationToCenterEmail = (useremail, student, level) => {
  email.send({
    template: 'centerNotification',
    message: {
      from: 'ILAC <ilacregistration@ukr.net>',
      to: useremail,
      // to: 'o.perepichai@gmail.com',
      attachments: [{
        filename: 'receipt.pdf',
        path: `pdfReceipts/${student.email}.pdf`,
      }],
      // cc: 'ilac.kyiv@gmail.com',
    },
    locals: {
      student,
      level,
    },
  }).then(() => console.log(`email has been send to center ${useremail}!`));
};

const sendNotificationToIlac = (useremail, student, level) => {
  email.send({
    template: 'notificationIlac',
    message: {
      from: 'ILAC <ilacregistration@ukr.net>',
      to: useremail,
    },
    locals: {
      student,
      level,
    },
  }).then(() => console.log(`email has been send to ILAC ${useremail}!`));
};


module.exports = {
  sendEmail,
  sendEmailPaid,
  sendCertificate,
  sendTest,
  sendNotificationToCenterEmail,
  sendNotificationToIlac,
};
