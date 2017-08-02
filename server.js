/* jshint esversion:6, node: true */

/* coursebot Server
 * https://coursebot.xxx/ still to be discussed
 *
 * © 2017 Evaristo & Sharon hacking Jay and Peter's whobot (Chingu)
*/

/* ================================= SETUP ================================= */
const express    = require('express'),
      app        = express(),
      port       = process.env.PORT || 3000,

      // middleware
      bodyParser = require('body-parser'),
      morgan     = require('morgan'),
      
      // db
      db         = require('./db'),
      //mongoose   = require('mongoose'), we will be using Firebase!!
      
      // whobot
      whobot     = require('./bin/coursebot'),
      
      // Slack auth
      slack      = require('./slack');

/* ============================== MIDDLEWARE =============================== */

// logging
app.use(morgan('dev'));

// parse POST request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// error handler
app.use(function (err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
});


/* ============================= CONNECT TO DB ============================= */
//Originally mongoose, we will use Firebase

//mongoose.connect(db.getDbConnectionString());
//mongoose.Promise = global.Promise;


/* ================================ ROUTES ================================= */

// Slack authentication route
app.get('/auth', slack);

// bot route
app.post('/coursebot', coursebot);

/* ============================= START SERVER ============================== */
app.listen(port, function () {
    console.log('Coursebot server listening on port: ' + port);
});
