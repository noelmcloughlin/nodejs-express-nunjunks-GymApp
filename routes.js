'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');

//About
router.get('/about', about.index);
router.get('/privacy', about.privacy);
router.get('/privacy/ok', accounts.index);

//Accounts
router.get('/', accounts.index);
router.get('/signup', accounts.signup);
router.get('/login', accounts.login);
router.get('/logout', accounts.logout);
router.post('/authenticate', accounts.authenticate);
router.post('/register', accounts.register);
router.get('/settings', accounts.settings);
router.post('/settings', accounts.updateSettings);
router.get('/dashboard', dashboard.index);

//Member Dashboard
router.post('/dashboard/addassessment', dashboard.addassessment);
router.get('/dashboard/{id}/deleteassessment/{assessmentid}', dashboard.deleteassessment);

//Trainer Dashboard
router.get('/dashboard/deletemember/{id}', dashboard.deletemember);
router.get('/trainerassessment/{id}', dashboard.trainerassessment);
router.post('/editcomment/{id}', dashboard.editcomment);

module.exports = router;
