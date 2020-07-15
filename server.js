'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { handleClients, handleClient, addNewClient, removeClient, handle404 }
= require('./handlers/clientHandlers.js');

const { showWord, getWordData, guessLetter } = require('./handlers/hangmanHandlers.js');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/clients', handleClients)
  .get('/client/:id', handleClient)
  .post('/new-client', addNewClient)
  .delete('/client/:id', removeClient)

  .get('/hangman/words/:id', showWord)
  .get('/hangman/word', getWordData)
  .get('/hangman/guess/:id/:guess', guessLetter)

  .get('*', handle404)

  .listen(8000, () => console.log(`Listening on port 8000`));
