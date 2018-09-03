'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const trainerdashboard = require('./controllers/trainerdashboard.js');
const about = require('./controllers/about.js');

//Accounts
router.get('/', accounts.index);
router.get('/signup', accounts.signup);
router.get('/login', accounts.login);
router.get('/logout', accounts.logout);
router.post('/authenticate', accounts.authenticate);
router.post('/register', accounts.register);
router.get('/settings', accounts.settings);
router.post('/settings', accounts.updateSettings);

//Member Dashboard
router.get('/dashboard', dashboard.index);
router.post('/dashboard/addassessment', dashboard.addassessment);
router.get('/dashboard/{memberid}/deleteassessment/{assessmentid}', dashboard.deleteassessment);

//About
router.get('/about', about.index);
router.get('/privacy', about.privacy);
router.get('/privacy/ok', accounts.index);

//Trainer Dashboard
router.get('/trainerdashboard', trainerdashboard.index);
router.get('/trainerdashboard/deletemember/{id}', trainerdashboard.deletemember);
router.get('/trainerassessment/{id}', trainerdashboard.trainerassessment);
router.post('/editcomment/{id}', trainerdashboard.editComment);

module.exports = router;
