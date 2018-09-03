'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStorApi = {

    store: new JsonStore('./models/assessments.json', { assessmentCollection: [] }),
    collection: 'assessmentCollection',

    add(assessment) {
      this.store.add(this.collection, assessment);
      this.store.save();
    },

    remove(id) {
      const assessment = this.findById(id);
      this.store.remove(this.collection, assessment);
      this.store.save();
    },

    update(assessment) {
      this.store.update(this.collection, assessment);
      this.store.save();
    },

    findById(id) {
      return this.store.findOneBy(this.collection, { id: id });
    },

    findByMemberId(id) {
      return this.store.findOneBy(this.collection, { memberid: id });
    },

    findAll: function () {
        return this.store.findAll(this.collection);
      },
  };

module.exports = assessmentStorApi;
