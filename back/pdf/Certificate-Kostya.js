const PdfPrinter = require('pdfmake');
// const log = require('../logger/Pino');

// Define font files
const fonts = {
  Roboto: {
    normal: 'pdf-src/fonts/Roboto-Regular.ttf',
    bold: 'pdf-src/fonts/Roboto-Bold.ttf',
    italics: 'pdf-src/fonts/Roboto-Italic.ttf',
    bolditalics: 'pdf-src/fonts/Roboto-Italic.ttf',
  },
};

const printer = new PdfPrinter(fonts);
const fs = require('fs');
const path = require('path');


const createCertificateByEventAndUser = (event, user, certificateCode, date) => {
  const docDefinition = {
    background: [{
      image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
      width: 595,
    }],
    content: [
      // every object is new line in pdg file
      // {
      //   image: path.resolve('pdf-src/img/logo.png'),
      //   width: 100,
      //   margin: [0, 0, 0, 20],
      // },
      {
        text: `${user.name} ${user.last_name}`,
        style: 'header',
        bold: true,
        // left top right bottom
        margin: [120, 325, 0, 10],
      },
      {
        text: `${event.name}`,
        style: 'topic',
        margin: [0, 30, 70, 10],
      },
      {
        text: `${event.duration}`,
        style: 'textStyle',
        bold: true,
        margin: [200, 12, 0, 6],
      },
      {
        text: `${event.speaker}`,
        style: 'textStyle',
        bold: true,
        margin: [260, 120, 0, 6],
      },
      {
        image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
        width: 100,
        absolutePosition: { x: 200, y: 570 },
      },
      {
        text: `${event.date}`,
        style: 'textStyle',
        bold: true,
        margin: [20, 90, 0, 10],
      },
      // {
      //     text: `${event.contents1}`,
      //     style: 'textStyle',
      //     bold: true,
      //     margin: [20, 110, 0, 10],
      // },
      {
        text: `${certificateCode}`,
        style: 'textStyle',
        bold: true,
        margin: [35, 137, 0, 10],
      },
      // {
      //   text: 'Квитанція',
      //   style: 'subheader',
      // },
      // {
      //   style: 'tableExample',
      //   table: {
      //     widths: [100, '*', 200, '*'],
      //     body: [
      //       ['width=100', 'star-sized', 'width=200', 'star-sized'],
      //       ['Текст першого стовбця', {
      //         text: 'Текст другого стовбця',
      //         italics: true,
      //         color: 'gray',
      //       }, {
      //         text: 'nothing interesting here',
      //         italics: true,
      //         color: 'gray',
      //       }, {
      //         text: 'nothing interesting here',
      //         italics: true,
      //         color: 'gray',
      //       }],
      //     ],
      //   },
      // },
    ],
    defaultStyle: {
      fontSize: 14,
      bold: false,
    },
    styles: {
      textStyle: {
        fontSize: 12,
        bold: false,
      },
      topic: {
        fontSize: 16,
        bold: true,
        color: '#bd2a2a',
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
  pdfDoc.end();
  console.log('Pdf create');
};

const createCertificateByTest = (event, user, certificateCode, date) => {
  const docDefinition = {
    background: [{
      image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
      width: 595,
    }],
    content: [
      // every object is new line in pdg file
      // {
      //   image: path.resolve('pdf-src/img/logo.png'),
      //   width: 100,
      //   margin: [0, 0, 0, 20],
      // },
      {
        text: `${user.name} ${user.last_name}`,
        style: 'header',
        bold: true,
        // left top right bottom
        margin: [120, 325, 0, 10],
      },
      {
        text: `${event.name}`,
        style: 'topic',
        margin: [0, 30, 70, 10],
      },
      {
        text: `${event.duration}`,
        style: 'textStyle',
        bold: true,
        margin: [200, 12, 0, 6],
      },
      {
        text: `${event.speaker}`,
        style: 'textStyle',
        bold: true,
        margin: [260, 120, 0, 6],
      },
      {
        image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
        width: 100,
        absolutePosition: { x: 200, y: 570 },
      },
      {
        text: `${event.date} ${event.contents1}`,
        style: 'textStyle',
        bold: true,
        margin: [20, 90, 0, 10],
      },
      // {
      //     text: `${event.contents1}`,
      //     style: 'textStyle',
      //     bold: true,
      //     margin: [20, 110, 0, 10],
      // },
      {
        text: `${certificateCode} ${event.contents1}`,
        style: 'textStyle',
        bold: true,
        margin: [35, 137, 0, 10],
        pageBreak: 'after',
      },
      {
        text: `${event.date} ${event.contents1}`,
        style: 'textStyle',
        bold: true,
        margin: [20, 90, 0, 10],
      },
      {
        image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        width: 550,
      },
      {
        text: `содержание`,
        style: 'textStyle',
        bold: true,
        margin: [35, 20, 0, 10],
    },
    {
        text: `${event.contents1}`,
        style: 'textStyle',
        bold: true,
        margin: [35, 20, 0, 10],
    },
    {
        text: `${event.contents2}`,
        style: 'textStyle',
        bold: true,
        margin: [35, 20, 0, 10],
    },
    {
        text: `${event.contents3}`,
        style: 'textStyle',
        bold: true,
        margin: [35, 20, 0, 10],
    },
      // {
      //   text: 'Квитанція',
      //   style: 'subheader',
      // },
      // {
      //   style: 'tableExample',
      //   table: {
      //     widths: [100, '*', 200, '*'],
      //     body: [
      //       ['width=100', 'star-sized', 'width=200', 'star-sized'],
      //       ['Текст першого стовбця', {
      //         text: 'Текст другого стовбця',
      //         italics: true,
      //         color: 'gray',
      //       }, {
      //         text: 'nothing interesting here',
      //         italics: true,
      //         color: 'gray',
      //       }, {
      //         text: 'nothing interesting here',
      //         italics: true,
      //         color: 'gray',
      //       }],
      //     ],
      //   },
      // },
    ],
    defaultStyle: {
      fontSize: 14,
      bold: false,
    },
    styles: {
      textStyle: {
        fontSize: 12,
        bold: false,
      },
      topic: {
        fontSize: 16,
        bold: true,
        color: '#bd2a2a',
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream('certificate/test.pdf'));
  pdfDoc.end();
  console.log('pdf create testPdf');
};


module.exports = {
  createCertificateByEventAndUser,
  createCertificateByTest,
};
