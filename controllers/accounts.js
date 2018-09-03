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
      response.render(viewData.id, viewData);
    },

    signup(request, response) {
      const viewData = {
          title: 'Signup to the GymApp',
          id: 'signup',
        };
      response.render(viewData.id, viewData);
    },

    login(request, response) {
      const viewData = {
          title: 'Login to the GymApp',
          id: 'login',
        };
      response.render(viewData.id, viewData);
    },

    settings(request, response) {
      const user = getLoggedInUser();
      const viewData = {
          title: 'Settings',
          id: 'settings',
        };
      response.render(viewData.id, viewData);
    },

    updateSettings(request, response) {
      const user = request.body;
      members.update(user);
      const viewData = {
          title: 'Settings',
          id: 'settings',
        };
      response.render(viewData.id, viewData);
    },

    logout(request, response) {
      response.cookie('gymapp', '');
      this.index();
    },

    getLoggedInUser(request) {
      //const userEmail = request.cookies.gymapp;
      let userEmail = accounts.getCookie('nodeJsGymApp');
      return trainers.findByEmail(userEmail) || members.findByEmail(userEmail);
    },

    register(request, response) {
      const user = request.body;
      user.id = uuid();
      user.assessments = [];
      members.add(user);
      logger.info(`registering ${user.email}`);
      response.render('login', undefined);
    },

    authenticate(request, response) {
      let user = members.findByEmail(request.body.email);
      if (!user)
          user = trainers.findByEmail(request.body.email);
      if (user) {
        //response.cookie('gymapp', user.email);
        accounts.setCookie('nodeJsGymApp', user.email, 365);
        logger.info(`logging in ${user.email}`);
        response.render('dashboard', undefined);
      } else {
        response.render('login', undefined);
      }
    },

    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    },

    getCookie(cname) {
      var name = cname + '=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return '';
    },
  };

module.exports = accounts;
