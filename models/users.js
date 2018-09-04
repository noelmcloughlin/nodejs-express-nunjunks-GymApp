'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStorApi = {

    store: new JsonStore('./models/users.json', { users: [] }),
    collection: 'users',

    findAll: function () {
      return this.store.findAll(this.collection);
    },

    findAllMembers: function () {
        let members = {};
        let users = this.store.findAll(this.collection);
        for (var user in users) {
          if (user.role == 'member') {
            members.add(user);
          }
        };

        return members;
      },

    add(user) {
      this.store.add(this.collection, user);
      this.store.save();

    },

    remove(id) {
      const user = this.findById(id);
      this.store.remove(this.collection, user);
      this.store.save();

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
      this.assessments.remove(assessmentId);
    },
  };

module.exports = userStorApi;

