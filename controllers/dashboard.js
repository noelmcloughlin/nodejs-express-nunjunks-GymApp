'use strict';

const accounts = require('./accounts.js');
const assessments = require('../models/assessments');
const members = require('../models/members');
const trainers = require('../models/trainers');
const analytics = require('../utils/analytics');
const logger = require('../utils/logger');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    const member = accounts.getLoggedInUser(request);
    const assessments = member.assessments;
    const memberStats = analytics.generateMemberStats(member);
    const viewData = {
        title: 'Member Dashboard',
        id: 'dashboard',
        member: member,
        assessments: assessments,
        memberStats: memberStats,
      };
    response.render('dashboard', viewData);
  },

  addassessment: function (request, response) {
      const member = accounts.getLoggedInUser(request);
      const assessment = request.body;
      assessment.id = uuid();
      assessment.memberid = member.id;
      assessments.add(assessment);

      const memberStats = analytics.generateMemberStats(member);
      assessment.trend = memberStats.trend;

      member.assessments.unshift(assessment.id);
      response.redirect('/dashboard');
    },

  deleteassessment: function (request, response) {
      const memberId = request.params.memberid;
      const member = members.findById(memberId);

      const assessmentId = request.params.assessmentid;
      const assessment = assessment.findById(assessmentid);

      member.assessments.remove(assessment);
      assessments.remove(assessmentId);
      response.redirect('/dashboard');
    },
};

module.exports = dashboard;
