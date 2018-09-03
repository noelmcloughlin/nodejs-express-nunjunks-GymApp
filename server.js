'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const app = express();

//cookies stuff
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
global.document = new JSDOM("localhost:4000").window.document;

nunjucks.installJinjaCompat()
nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app
});

app.set('view engine', 'njk');
app.use(express.static('./public/'));
app.use(require("body-parser").urlencoded({ extended: true }))
app.use('/', routes);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());

const listener = app.listen(process.env.PORT || 4000, function () {
    logger.info(`gym-app-nodejs started on port ${listener.address().port}`);
  });