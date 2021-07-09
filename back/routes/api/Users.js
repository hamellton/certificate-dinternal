const express = require('express');
const bodyParser = require('body-parser');
const sql = require('../../sql/Users');
const pdf = require('../../pdf/Certificate');
const log = require('../../logger/Pino');
const email = require('../../emailing/Email');

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

router.get('/:guid', (req, res) => {
  const { time } = req.query;
  const { guid } = req.params;
  if (time) {
    sql.usersByTime(time).then((resp) => {
      res.send(resp);
    })
      .catch((err) => {
        res.send('error');
        console.log(err);
      });
  } else if (guid) {
    sql.userByGuid(guid).then((resp) => {
      res.send(resp);
    })
      .catch((err) => {
        res.send('error');
        console.log(err);
      });
  } else {
    sql.users().then((resp) => {
      res.send(resp);
    })
      .catch((err) => {
        res.send('error');
        console.log(err);
      });
  }
});

router.get('/', (req, res) => {
  const { time } = req.query;
  if (time) {
    sql.usersByTime(time).then((resp) => {
      res.send(resp);
    })
      .catch((err) => {
        res.send('error');
        console.log(err);
      });
  } else {
    sql.users().then((resp) => {
      res.send(resp);
    })
      .catch((err) => {
        res.send('error');
        console.log(err);
      });
  }
});


router.post('/', (req, res) => {
  const user = Object.assign(req.body);
  user.Source = 'crm';
  sql.userByGuid(user.ClientId).then((r) => {
    if (r) {
      sql.updateCRM(user).then(() => {
        res.status(200);
        res.send('client saved successfully');
      })
        .catch((err) => {
          res.status(200);
          res.send('error');
          console.log(err);
        });
    } else {
      sql.insertCRM(user).then(() => {
        res.status(200);
        res.send('client saved successfully');
      })
        .catch((err) => {
          res.status(200);
          res.send('error');
          console.log(err);
        });
    }
  })
    .catch((err) => {
      res.status(200);
      res.send('error');
      console.log(err);
    });
});

// router.post('/update', (req, res) => {
//   const user = Object.assign(req.body);
//   sql.userByGuid(user.guid).then((r) => {
//     if (r) {
//       sql.updateFront(user).then((resp) => {
//         return resp;
//       }).then(() => {
//         sql.userByGuid(user.guid).then((responce) => {
//           const date = new Date();
//           const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//           const dateStr = date.toLocaleString('ru', options).split('/').join('.');
//           let numInvoice = '';
//           console.log(`user.term ${user.term}`);
//           if (user.term === '1') {
//             numInvoice = `№ СН-${responce.ID}`;
//           } else if (user.term === '2') {
//             numInvoice = `№ ПВ-${responce.ID}`;
//           } else { numInvoice = '№ ---'; }
//           pdf.createReceipt(responce.ID, user.namecyr, user.sum, numInvoice, dateStr, user.term);
//           log.info('module Users: finished creating pdf');
//           email.sendEmail(user.emailforinvoice, user.namecyr, { term: user.term, ID: responce.ID });
//           sql.updateInvoiceFront(responce.ID, numInvoice).then(() => {
//             log.info('invoiceNumber updated successfully');
//           })
//             .catch(() => {
//               log.info('invoiceNumber updated ERROR');
//             });
//           res.status(200);
//           res.send('client saved successfully');
//           log.info('client saved successfully');
//         })
//           .catch((err) => {
//             res.status(200);
//             res.send('error');
//             console.log(`userByGuid ${err}`);
//           });
//       })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       sql.insertFront(user).then((respInsert) => {
//         const date = new Date();
//         const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//         const dateStr = date.toLocaleString('ru', options).split('/').join('.');
//         let numInvoice = '';
//         console.log(`user.term ${user.term}`);
//         if (user.term === '1') {
//           numInvoice = `№ СН-${respInsert.insertId}`;
//         } else if (user.term === '2') {
//           numInvoice = `№ ПВ-${respInsert.insertId}`;
//         } else { numInvoice = '№ ---'; }
//         pdf.createReceipt(respInsert.insertId, user.namecyr, user.sum, numInvoice, dateStr, user.term);
//         log.info('module users: finished creating pdf');
//         email.sendEmail(user.emailforinvoice, user.namecyr, { term: user.term, ID: respInsert.insertId });
//         sql.updateInvoiceFront(respInsert.insertId, numInvoice).then(() => {
//           log.info('invoiceNumber updated successfully');
//         })
//           .catch(() => {
//             log.info('invoiceNumber updated ERROR');
//           });
//         res.status(200);
//         res.send('client saved successfully');
//         log.info('client saved successfully');
//       })
//         .catch(() => {
//           res.status(200);
//           res.send('error');
//           log.info('sql.insertFront(user) ERROR');
//         });
//     }
//   })
//     .catch((err) => {
//       console.log(err);
//     });
// });


module.exports = router;
