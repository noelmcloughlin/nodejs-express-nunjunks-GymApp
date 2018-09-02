'use strict';

const logger = require('../utils/logger');

const about = {
    index(request, response) {
      const viewData = {
          title: 'About GymApp',
        };
      response.render('about', viewData);
    },

    privacy(request, response) {
      response.render('privacy', null);
    },
  };

module.exports = about;
