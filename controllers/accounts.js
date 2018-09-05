'use strict';

const logger = require('../utils/logger');
const members = require('../models/users');

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
        response.render('about', undefined);
    },

    signup(request, response) {
        const loggedinUser = accounts.getLoggedInUser(request);
        if (loggedinUser)
            response.redirect('/dashboard');
        else {
            response.render('signup', undefined);
        }
    },

    login(request, response) {
        const loggedinUser = accounts.getLoggedInUser(request);
        if (loggedinUser)
            response.redirect('/dashboard');
        else {
            response.render('login', undefined);
        }
    },

    settings(request, response) {
        const loggedinUser = accounts.getLoggedInUser(request);
        if (!loggedinUser)
            response.redirect('/dashboard');
        else {
            const viewData = {
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
        if (user && userStorApi.checkPassword(user, request.body.password)) {
            accounts.setCookie('nodeJsGymApp', user.email, 365);
            response.redirect('/dashboard');
        } else {
            console.log("Authentication failed for ", user.email);
            response.redirect('/login');
        }
    }
};

module.exports = accounts;