'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStorApi = {

    store: new JsonStore('./models/users.json', { users: [] }),
    collection: 'users',

    findAll: function () {
      return this.store.findAll(this.collection);
    },

    add(user) {
      this.store.add(this.collection, user);
    },

    remove(id) {
      const user = this.findById(id);
      this.store.remove(this.collection, user);
    },

    update(user) {
      this.store.update(this.collection, user);
      this.store.save();
    },

    findByEmail(email) {
      return this.store.findOneBy(this.collection, { email: email });
    },

    findById(id) {
      return this.store.findOneBy(this.collection, { id: id });
    },

    checkPassword(password) {
      return this.password.equals(password);
    },

    addAssessment(assessmentId) {
      this.assessments.push(assessmentId);
    },

    removeAssessment(assessmentId) {
      this.assessments.unshift(assessmentId);
    },
  };

module.exports = userStorApi;

