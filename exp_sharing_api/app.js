const express = require('express');
const fs = require('fs');
const dayjs = require('dayjs');
const cors = require('cors');

const apiRouter = require('./routes/api');


// Creación de la APP
const app = express();
app.use(express.json());

// Middleware de CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Middleware de registro de peticiones
app.use((req, res, next) => {
  const data = `[${dayjs().format('DD-MM-YYYY HH:mm:ss')}] Método: ${req.method} - Url: ${req.url}\n`;
  fs.appendFile('./logs/main.log', data, (err) => {
    if (err) console.log(err);
    next();
  });
});

app.use('/api', apiRouter);


// Middleware error
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});


module.exports = app;
