'use strict';

const accounts = require('./accounts.js');
const analytics = require('../utils/analytics');
const logger = require('../utils/logger');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    const member = accounts.getLoggedInMember();
    const assessments = member.assessments;
    const memberStats = analytics.generateMemberStats(member);
    Collections.reverse(assessments);
    const viewData = {
        title: 'Member Dashboard',
        id: 'dashboard',
        member: member,
        assessments: assessments,
        memberStats: memberStats,
      };
    response.render(viewData.id, viewData);
  },

  addassessment: function (request, response) {
      const member = accounts.getLoggedInMember(request);
      const assessment = request.body;
      assessment.id = uuid();
      assessment.memberid = memberId;
      assessments.add(assessment);

      const memberStats = analytics.generateMemberStats(member);
      assessment.trend = memberStats.trend;

      member.assessments.add(assessment);
      member.save();
      const viewData = {
          title: 'Member Dashboard',
          id: 'dashboard',
          member: member,
          assessments: assessments.findByMemberId(memberId),
          memberStats: memberStats,
        };
      response.render(viewData.id, viewData);
    },

  deleteassessment: function (request, response) {
      const memberId = request.params.memberid;
      const member = members.findById(memberId);

      const assessmentId = request.params.assessmentid;
      const assessment = assessment.findById(assessmentid);

      member.assessments.remove(assessment);
      assessments.remove(assessmentId);
      const viewData = {
          title: 'Dashboard',
          id: 'dashboard',
          member: member,
          assessments: assessments.findByMemberId(memberId),
          memberStats: memberStats,
        };
      response.render(viewData.id, viewData);
    },
};

module.exports = dashboard;
