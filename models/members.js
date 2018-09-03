'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const members = {

    store: new JsonStore('./models/members.json', { memberCollection: [] }),
    collection: 'memberCollection',

    add(user) {
      this.store.add(this.collection, user);
    },

    remove(id) {
      const user = this.findById(id);
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

    checkPassword: function (password) {
        return this.password.equals(password);
      },

    addAssessment: function (assessmentId) {
        this.assessments.push(assessmentId);
      },

    removeAssessment: function (assessmentId) {
        this.assessments.unshift(assessmentId);
      },
  };

module.exports = members;

