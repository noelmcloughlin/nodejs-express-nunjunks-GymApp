'use strict';

const logger = require('../utils/logger');
const members = require('../models/users');

const assessmentStorApi = require('../models/assessments');
const userStorApi = require('../models/users');
const uuid = require('uuid');

const accounts = {

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

    getLoggedInUser(request) {
      const userEmail = accounts.getCookie('nodeJsGymApp');
      const user = userStorApi.findByEmail(userEmail);
      return user;
    },

    index(request, response) {
      const viewData = {
          title: 'Login or Signup',
          id: 'about',
        };
      response.render('about', viewData);
    },

    signup(request, response) {
      const loggedinUser = accounts.getLoggedInUser(request);
      if (loggedinUser)
          response.redirect('/dashboard');
      else {
        const viewData = {
            title: 'Signup to the GymApp',
            id: 'signup',
          };
        response.render('signup', viewData);
      }
    },

    login(request, response) {
      const loggedinUser = accounts.getLoggedInUser(request);
      if (loggedinUser)
          response.redirect('/dashboard');
      else {
        const viewData = {
            title: 'Login to the GymApp',
            id: 'login',
          };
        response.render('login', viewData);
      }
    },

    settings(request, response) {
      const loggedinUser = accounts.getLoggedInUser(request);
      if (!loggedinUser)
          response.redirect('/dashboard');
      else {
        const viewData = {
            title: 'Settings',
            id: 'settings',
            user: loggedinUser,
          };
        response.render('settings', viewData);
      }
    },

    updateSettings: function (request, response) {
        let loggedinUser = accounts.getLoggedInUser(request);
        if (!loggedinUser)
            response.redirect('/dashboard');
        else {
          const user = request.body;
          loggedinUser.email = user.email;
          loggedinUser.name = user.name;
          loggedinUser.password = user.password;
          loggedinUser.address = user.address;
          loggedinUser.role = user.role;
          loggedinUser.gender = user.gender;
          loggedinUser.height = user.height;
          loggedinUser.startingweight = user.startingweight;
          console.log(request.body);

          userStorApi.update(loggedinUser);
          response.redirect('/dashboard');
        }
      },

    logout: function (request, response) {
        const loggedinUser = accounts.getLoggedInUser(request);
        if (loggedinUser) {
          accounts.setCookie('nodeJsGymApp', '', -1);
          response.redirect('/');
        } else
            response.redirect('/dashboard');
      },

    register(request, response) {
      const loggedinUser = accounts.getLoggedInUser(request);
      if (!loggedinUser) {
        const user = request.body;
        user.id = uuid();
        userStorApi.add(user);
        response.redirect('/login');
      } else
          response.redirect('/dashboard');
    },

    authenticate(request, response) {
      const loggedinUser = accounts.getLoggedInUser(request);
      if (loggedinUser) {
        response.redirect('/dashboard');
        return;
      }

      const user = userStorApi.findByEmail(request.body.email);
      if (!user) {
        response.redirect('/signup');
        return;
      }

      accounts.setCookie('nodeJsGymApp', user.email, 365);
      const viewData = {
          title: 'Settings',
          id: 'settings',
          user: user,
          assessments: assessmentStorApi.findByMemberId(user.id),
        };
      response.render('dashboard', viewData);
      //window.location.reload(true);

    },

  };

module.exports = accounts;
