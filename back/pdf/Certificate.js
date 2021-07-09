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
        }, ],
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
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('Pdf create')

};


const createCertificateByTest = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 220, y: 330 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                margin: [0, 347, 70, 10],
            },
            {
                text: `Тривалість - ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [65, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 30, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 340, y: 490 },
            },
            {
                text: `Методист`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [0, 170, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [55, 212, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `Тема: ${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [79, 188, 70, 10],
            },
            {
                text: `Зміст:`,
                style: 'redText',
                bold: false,
                margin: [79, 5, 0, 0],
            },
            {
                text: `1. ${event.contents1}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            {
                text: `2. ${event.contents2}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            {
                text: `3. ${event.contents3}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            // {
            //     text: `Форма:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 349 },
            // },
            {
                text: `Форма: дистанційна (вебінар з підвищення кваліфікації вчителів `,
                style: 'textStyle',
                bold: false,
                margin: [79, 8, 0, 0],
            },
            {
                text: `англійської мови`,
                style: 'textStyle',
                bold: false,
                margin: [110, 5, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `Тренер: методист ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `Дата: ${event.date}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `Обсяг: ${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
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
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#bd2a2a',
            },
            header: {
                fontSize: 12,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create testPdf')

};

const createCertificateByTestFortyOne = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 220, y: 330 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                margin: [0, 347, 70, 10],
            },
            {
                text: `Тривалість - ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [65, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 30, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 340, y: 490 },
            },
            {
                text: `спікер «Pearson»`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [0, 170, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [55, 225, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `Тема: ${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [79, 188, 70, 10],
            },
            {
                text: `Зміст:`,
                style: 'redText',
                bold: false,
                margin: [79, 5, 0, 0],
            },
            {
                text: `1. ${event.contents1}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            {
                text: `2. ${event.contents2}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            {
                text: `3. ${event.contents3}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            // {
            //     text: `Форма:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 349 },
            // },
            {
                text: `Форма: дистанційна (вебінар з підвищення кваліфікації вчителів `,
                style: 'textStyle',
                bold: false,
                margin: [79, 8, 0, 0],
            },
            {
                text: `англійської мови`,
                style: 'textStyle',
                bold: false,
                margin: [110, 5, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `Тренер: спікер «Pearson» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `Дата: ${event.date}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `Обсяг: ${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
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
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#bd2a2a',
            },
            header: {
                fontSize: 12,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create testPdf')

};

const createCertificateByTwoSpeakers = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 220, y: 330 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                margin: [0, 347, 70, 10],
            },
            {
                text: `Тривалість - ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [65, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 30, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 340, y: 490 },
            },
            {
                text: `Методисти`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [0, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [0, 170, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [55, 232, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `Тема: ${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [79, 188, 70, 10],
            },
            {
                text: `Зміст:`,
                style: 'redText',
                bold: false,
                margin: [79, 5, 0, 0],
            },
            {
                text: `1. ${event.contents1}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            {
                text: `2. ${event.contents2}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            {
                text: `3. ${event.contents3}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 2, 0, 0],
            },
            // {
            //     text: `Форма:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 349 },
            // },
            {
                text: `Форма: дистанційна (вебінар з підвищення кваліфікації вчителів `,
                style: 'textStyle',
                bold: false,
                margin: [79, 8, 0, 0],
            },
            {
                text: `англійської мови`,
                style: 'textStyle',
                bold: false,
                margin: [110, 5, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `Тренери: методисти ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `Дата: ${event.date}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `Обсяг: ${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [79, 7, 0, 0],
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
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#bd2a2a',
            },
            header: {
                fontSize: 12,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create testPdf')

};



const createCertificateByProteach = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 260, y: 300 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                width: 500,
                margin: [70, 347, 70, 0],
            },
            {
                text: `Загальний обсяг: ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 110, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 375, y: 575 },
            },
            {
                text: `Тренер курсу`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [70, 90, 0, 6],
            // },
            // {
            //     text: `${event.date2}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [0, 170, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [140, 128, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [20, 153, 70, 10],
            },
            {
                text: `дистанційна (серія онлайн тренінгів підвищення кваліфікації вчи телів англійської мови)`,
                style: 'textStyle',
                bold: false,
                margin: [24, 234, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `методист ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [28, 8, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `${event.date2}`,
                style: 'textStyle',
                bold: false,
                margin: [20, 8, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [83, 8, 0, 0],
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
                fontSize: 10,
                bold: false,
                weight: 200
            },
            topic: {
                fontSize: 16,
                bold: true,
                color: '#EC6343',
            },
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#EC6343',
            },
            header: {
                fontSize: 16,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create seventyPdf')

};


const createCertificateBySeventyOne = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 260, y: 300 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                width: 500,
                margin: [70, 347, 70, 0],
            },
            {
                text: `Загальний обсяг: ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 110, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 375, y: 575 },
            },
            {
                text: `Тренер курсу`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [70, 90, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [140, 128, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [20, 153, 70, 10],
            },
            {
                text: `дистанційна (серія онлайн тренінгів підвищення кваліфікації вчи телів англійської мови)`,
                style: 'textStyle',
                bold: false,
                margin: [24, 234, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `методист ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [28, 8, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `${event.date2}`,
                style: 'textStyle',
                bold: false,
                margin: [20, 8, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [83, 8, 0, 0],
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
                fontSize: 10,
                bold: false,
                weight: 200
            },
            topic: {
                fontSize: 16,
                bold: true,
                color: '#EC6343',
            },
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#EC6343',
            },
            header: {
                fontSize: 16,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create seventyPdf')

};


const createCertificateBySeventyTwo = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 260, y: 300 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                width: 500,
                margin: [70, 347, 70, 0],
            },
            {
                text: `Загальний обсяг: ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 110, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 375, y: 575 },
            },
            {
                text: `Тренер курсу`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [70, 90, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [140, 128, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [20, 153, 70, 10],
            },
            {
                text: `дистанційна (серія онлайн тренінгів підвищення кваліфікації вчи телів англійської мови)`,
                style: 'textStyle',
                bold: false,
                margin: [30, 200, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `методист ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [28, 8, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `${event.date2}`,
                style: 'textStyle',
                bold: false,
                margin: [20, 8, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [83, 8, 0, 0],
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
                fontSize: 10,
                bold: false,
                weight: 200
            },
            topic: {
                fontSize: 16,
                bold: true,
                color: '#EC6343',
            },
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#EC6343',
            },
            header: {
                fontSize: 16,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create seventyPdf')

};

const createCertificateBySeventyThree = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 260, y: 300 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                width: 500,
                margin: [70, 347, 70, 0],
            },
            {
                text: `Загальний обсяг: ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 110, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 375, y: 575 },
            },
            {
                text: `Тренер курсу`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [70, 90, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [140, 128, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [20, 153, 70, 10],
            },
            {
                text: `дистанційна (серія онлайн тренінгів підвищення кваліфікації вчи телів англійської мови)`,
                style: 'textStyle',
                bold: false,
                margin: [30, 251, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `методист ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [28, 8, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `${event.date2}`,
                style: 'textStyle',
                bold: false,
                margin: [20, 8, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [83, 8, 0, 0],
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
                fontSize: 10,
                bold: false,
                weight: 200
            },
            topic: {
                fontSize: 16,
                bold: true,
                color: '#EC6343',
            },
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#EC6343',
            },
            header: {
                fontSize: 16,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create seventyPdf')

};

const createCertificateByProteachTwoSpeakers = (event, user, certificateCode, date) => {
    const docDefinition = {
        // background: [{
        //     // image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
        //     image: path.resolve(`pdf-src/img/cert_50-01.png`),
        //
        //     width: 595,
        // },
        // ],
        content: [
            // every object is new line in pdg file
            // {
            //   image: path.resolve('pdf-src/img/logo.png'),
            //   width: 100,
            //   margin: [0, 0, 0, 20],
            // },

            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${user.name} ${user.last_name}`,
                style: 'header',
                bold: true,
                absolutePosition: { x: 260, y: 300 },
            },
            {
                text: `${event.name}`,
                style: 'topic',
                aligment: 'center',
                width: 500,
                margin: [70, 347, 70, 0],
            },
            {
                text: `Загальний обсяг: ${event.duration}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 8, 0, 6],
            },
            {
                text: `${event.speaker}`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 110, 0, 6],
            },
            {
                image: path.resolve(`pdf-src/img/speaker/${event.speaker_code}.png`),
                width: 100,
                absolutePosition: { x: 375, y: 575 },
            },
            {
                text: `Тренери курсу`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            {
                text: `ТОВ «Дінтернал Ед’юкейшн»`,
                style: 'textStyle',
                // bold: true,
                margin: [70, 1, 0, 6],
            },
            // {
            //     text: `${event.date}`,
            //     style: 'textStyle',
            //     // bold: true,
            //     margin: [70, 90, 0, 6],
            // },
            {
                text: `${certificateCode}`,
                style: 'textStyle',
                // bold: true,
                margin: [140, 128, 0, 10],
                pageBreak: 'after',
            },
            {
                image: path.resolve(`pdf-src/img/cert_${event.type_num}_02.png`),
                width: 595,
                absolutePosition: { x: 0, y: 0 },
            },
            {
                text: `${event.name}`,
                style: 'secondTopic',
                aligment: 'center',
                margin: [20, 153, 70, 10],
            },
            {
                text: `дистанційна (серія онлайн тренінгів підвищення кваліфікації вчи телів англійської мови)`,
                style: 'textStyle',
                bold: false,
                margin: [30, 251, 0, 0],
            },
            // {
            //     text: `Тренер:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 392 },
            // },
            {
                text: `методисти ТОВ «Дінтернал Ед’юкейшн» ${event.speaker}`,
                style: 'textStyle',
                bold: false,
                margin: [28, 8, 0, 0],
            },
            // {
            //     text: `Дата:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 415 },
            // },
            {
                text: `${event.date2}`,
                style: 'textStyle',
                bold: false,
                margin: [20, 8, 0, 0],
            },
            // {
            //     text: `Обсяг:`,
            //     style: 'redText',
            //     bold: true,
            //     absolutePosition: { x: 120, y: 440 },
            // },
            {
                text: `${event.duration}`,
                style: 'textStyle',
                bold: false,
                margin: [83, 8, 0, 0],
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
                fontSize: 10,
                bold: false,
                weight: 200
            },
            topic: {
                fontSize: 16,
                bold: true,
                color: '#EC6343',
            },
            redText: {
                fontSize: 12,
                bold: true,
                color: '#bd2a2a',
            },
            secondTopic: {
                fontSize: 13,
                bold: true,
                color: '#EC6343',
            },
            header: {
                fontSize: 16,
                bold: false,
                // color: '#bd2a2a',
            },
        },
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`certificate/${certificateCode}.pdf`));
    pdfDoc.end();
    console.log('pdf create seventyPdf')

};


module.exports = {
    createCertificateByEventAndUser,
    createCertificateByTest,
    createCertificateByProteach,
    createCertificateByProteachTwoSpeakers,
    createCertificateBySeventyOne,
    createCertificateBySeventyTwo,
    createCertificateBySeventyThree,
    createCertificateByTestFortyOne,
    createCertificateByTwoSpeakers
};
