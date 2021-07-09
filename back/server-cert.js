const express = require('express');

const app = express();
const expressPino = require('express-pino-logger');
const log = require('./logger/Pino');

const expressLogger = expressPino({ log });


const PORT = process.env.PORT || 8070;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
app.use(expressLogger);

app.use('/api/clients/', require('./routes/api/Users'));
app.use('/api/events/', require('./routes/api/Events'));
app.use('/api/certificate/', require('./routes/api/Certificate'));
app.use('/api/google/', require('./routes/api/Google'));
