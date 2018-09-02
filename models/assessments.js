'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessments = {

    store: new JsonStore('./models/assessments.json', { assessmentCollection: [] }),
    collection: 'assessmentCollection',

    add(assessment) {
      this.store.add(this.collection, assessment);
    },

    remove(id) {
      const assessment = this.findById(id);
      this.store.remove(this.collection, assessment);
      this.store.save();
    },

    findById(id) {
      return this.store.findOneBy(this.collection, { id: id });
    },

    findByMemberId(memberid) {
      return this.store.findOneBy(this.collection, { memberid: memberid });
    },

    findAll: function () {
        return this.store.findAll(this.collection);
      },
  };

module.exports = assessments;
