const express = require('express')
const bodyParser = require('body-parser')
const sqlEvents = require('../../sql/Events')
const sqlUsers = require('../../sql/Users')
const pdf = require('../../pdf/Certificate')
const log = require('../../logger/Pino')
const email = require('../../emailing/Email')

const router = express.Router()

router.use(bodyParser.urlencoded({
    extended: true,
}));
router.use(bodyParser.json())

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
});


router.get('/', (req, res) => {
    // const { time } = req.query;
    // if (time) {
    //   sql.usersByTime(time).then((resp) => {
    //     res.send(resp);
    //   })
    //     .catch((err) => {
    //       res.send('error');
    //       console.log(err);
    //     });
    // } else {
    //   sql.users().then((resp) => {
    //     res.send(resp);
    //   })
    //     .catch((err) => {
    //       res.send('error');
    //       console.log(err);
    //     });
    // }
})


router.post('/', (req, res) => {
    const IDs = Object.assign(req.body)
    const sendCertificate = async () => {
        const event = await sqlEvents.eventByID(IDs.eventID)
            .catch((err) => {
                res.status(200)
                res.send('error')
                log.info(`typeNumByID error: ${err}`)
            })
        // const options = { year: 'numeric', day: '2-digit', month: '2-digit' };
        // const dateStr = event.date.toLocaleString('ru', options).split('/').join('');
        const date = event.date.split('.').join('')
        const user = await sqlUsers.userByID(IDs.userID)
            .catch((err) => {
                res.status(200)
                res.send('error')
                log.info(`userByID error: ${err}`)
            });

        const certificateCode = `DE-${event.type_num}-${date}${event.time}-${user.ID}`
        console.log(`certCode is: ${certificateCode}, ${event.name}`)

        if (event.type_num == 40) {
            pdf.createCertificateByTest(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 40')
        } else if (event.type_num == 41) {
            pdf.createCertificateByTestFortyOne(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 41')
        } else if (event.type_num == 42) {
            pdf.createCertificateByTwoSpeakers(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 42')
        } else if (event.type_num == 70) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 70')
        } else if (event.type_num == 71) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 71')
        } else if (event.type_num == 72) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 72')
        } else if (event.type_num == 73) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 73')
        } else if (event.type_num == 74) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 74')
        } else if (event.type_num == 77) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 77')
        } else if (event.type_num == 78) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 78')
        } else if (event.type_num == 79) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 79')
        } else if (event.type_num == 75) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 75')
        } else if (event.type_num == 80) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 80')
        } else if (event.type_num == 81) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 81')
        } else if (event.type_num == 82) {
            pdf.createCertificateByProteach(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 82')
        } else if (event.type_num == 83) {
            pdf.createCertificateByProteachTwoSpeakers(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 83')
        } else if (event.type_num == 76) {
            pdf.createCertificateBySeventyTwo(event, user, certificateCode, date)
            email.sendTest(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event 76')
        } else {
            pdf.createCertificateByEventAndUser(event, user, certificateCode, date)
            email.sendCertificate(user.email, certificateCode, event)
            console.log(event.type_num)
            console.log('event not 40')
        }
        res.status(200);
        res.send('certificate has been sent');
        log.info(`certificate # ${certificateCode} has been sent`)
        console.log(`certificate has been sent on mail ${user.email}`)
    };

    sendCertificate();
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
