'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainers = {

    store: new JsonStore('./models/trainers.json', { trainerCollection: [] }),
    collection: 'trainerCollection',

    add(user) {
      this.store.add(this.collection, user);
    },

    remove(id) {
      const user = this.getUser(id);
      this.store.remove(this.collection, user);
      this.store.save();
    },

    findByEmail(email) {
      return this.store.findOneBy(this.collection, { email: email });
    },

    findById(id) {
      return this.store.findOneBy(this.collection, { id: id });
    },

    findAll: function () {
        return this.store.findAll(this.collection);
      },

    checkPassword(password)
    {
      return this.password.equals(password);
    },
  };

module.exports = trainers;
