'use strict';

const _ = require('lodash');
const JsonStore = require('./jsonAPI');

const goalsApi = {

    store: new JsonStore('./models/goals.json', { goalCollection: [] }),
    collection: 'goalCollection',

    add(goal) {
      this.store.add(this.collection, goal);
      this.store.save();
    },

    remove(id) {
      this.store.remove(this.collection, this.findById(id));
      this.store.save();
    },

    update(goal) {
      this.store.update(this.collection, goal);
      this.store.save();
    },

    findById(id) {
      return this.store.findOneBy(this.collection, { id: id });
    },

    findByMemberId(id) {
      return this.store.findBy(this.collection, { memberid: id });
    },

    findAll: function () {
        return this.store.findAll(this.collection);
      },
  };

module.exports = goalsApi;
