'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app
});

app.use(express.static('./public/'));
app.use(require("body-parser").urlencoded({ extended: true }))
app.set("views", __dirname + "/views");
app.set("view engine", "njk");
app.use('/', routes);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());

const listener = app.listen(process.env.PORT || 4000, function () {
    logger.info(`gym-app-nodejs started on port ${listener.address().port}`);
  });