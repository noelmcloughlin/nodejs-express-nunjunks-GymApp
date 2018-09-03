'use strict';

const logger = require('../utils/logger');

const about = {
    index(request, response) {
      const viewData = {
          title: 'About GymApp',
          id: 'privacy',
        };
      response.render('about', viewData);
    },

    privacy(request, response) {
      response.render('privacy', undefined);
    },
  };

module.exports = about;
