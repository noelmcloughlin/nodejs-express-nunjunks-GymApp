'use strict';

const members = require('../models/members');
const trainers = require('../models/trainers');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {
    index(request, response) {
      const viewData = {
          title: 'Login or Signup',
          id: 'about',
        };
      response.render('about', viewData);
    },

    signup(request, response) {
      const viewData = {
          title: 'Signup to the GymApp',
          id: 'signup',
        };
      response.render('signup', viewData);
    },

    login(request, response) {
      const viewData = {
          title: 'Login to the GymApp',
          id: 'login',
        };
      response.render('login', viewData);
    },

    settings(request, response) {
      const user = getLoggedInMember();
      const viewData = {
          title: 'Settings',
          id: 'settings',
        };
      response.render('settings', viewData);
    },

    updateSettings(request, response) {
      const user = request.body;
      members.update(user);
      response.redirect('/settings');
    },

    logout(request, response) {
      response.cookie('gymapp', '');
      response.redirect('/');
    },

    getLoggedInMember(request) {
      const userEmail = request.cookies.gymapp;
      return members.findByEmail(userEmail);
    },

    getLoggedInTrainer(request) {
      const userEmail = request.cookies.gymapp;
      return trainers.findByEmail(userEmail);
    },

    register(request, response) {
      const user = request.body;
      user.id = uuid();
      members.add(user);
      logger.info(`registering ${user.email}`);
      response.redirect('/');
    },

    authenticateMember(request, response) {
      const user = members.findByEmail(request.body.email);
      if (user) {
        response.cookie('gymapp', user.email);
        logger.info(`logging in ${user.email}`);
        response.redirect('/dashboard');
      } else {
        response.redirect('/login');
      }
    },

    authenticateTrainer(request, response) {
      const user = trainers.findByEmail(request.body.email);
      if (user) {
        response.cookie('gymapp', user.email);
        logger.info(`logging in ${user.email}`);
        response.redirect('/trainerdashboard');
      } else {
        response.redirect('/login');
      }
    },
  };

module.exports = accounts;
