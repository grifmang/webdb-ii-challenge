const express = require('express');

const carRouter = require('./api/cars/carRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/cars', carRouter);

server.get('/', (req, res) => {
    res.send('Hey! I work!');
})

function logger(req, res, next) {
    const { method, originalUrl } = req;
    console.log(`${method} to ${originalUrl} at ${Date.now()}`);
  
    next();
}

module.exports = server;