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

//Dashboard
router.post('/dashboard/addassessment', dashboard.addassessment);
router.get('/dashboard/:memberid/deleteassessment/:assessmentid', dashboard.deleteassessment);
router.get('/dashboard/deletemember/:memberid', dashboard.deletemember);
router.get('/assessed/:memberid', dashboard.assessed);
router.post('/editcomment/:assessmentid', dashboard.editcomment);


//Goals
router.post('/dashboard/addgoal', dashboard.addgoal);
router.get('/dashboard/:memberid/deletegoal/:goalid', dashboard.deletegoal);
router.post('/editgoal/:goalid', dashboard.editcriteria );

module.exports = router;
