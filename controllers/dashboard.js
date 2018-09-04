'use strict';

const assessmentStorApi = require('../models/assessments');
const userStorApi = require('../models/users');
const accountsApi = require('./accounts');
const analyticsApi = require('../utils/analytics');

const logger = require('../utils/logger');
const uuid = require('uuid');

const dashboard = {
    index: function (request, response) {
        const user = accountsApi.getLoggedInUser(request);
        if (!user) {
          response.redirect('/login');

        } else if (user.role == 'trainer') {
          const viewData = {
              user: user,
              users: userStorApi.findAllMembers(),
            };
          response.render('dashboard', viewData);

        } else if (user.role == 'member') {
          const viewData = {
              user: user,
              assessments: assessmentStorApi.findByMemberId(user.id),
              memberStats: analyticsApi.generateMemberStats(user, assessmentStorApi.findByMemberId(user.id)),
            };
          response.render('dashboard', viewData);
        }
      },

    addassessment: function (request, response) {
        const member = accountsApi.getLoggedInUser(request);
        if (member) {
          const assessment = request.body;
          assessment.id = uuid();
          assessment.memberid = member.id;
          assessmentStorApi.add(assessment);
          const memberStats = analyticsApi.generateMemberStats(member, assessmentStorApi.findByMemberId(member.id));
          assessment.trend = memberStats.trend;
        }

        response.redirect('/dashboard');
      },

    deleteassessment: function (request, response) {
        const member = userStorApi.findById(request.params.memberid);
        const assessmentid = request.params.assessmentid;
        const assessment = assessmentStorApi.findById(assessmentid);
        assessmentStorApi.remove(assessmentid);
        response.redirect('/dashboard');
      },

    assessed: function (request, response) {
        const member = userStorApi.findById(request.params.memberid);
        const memberStats = analyticsApi.generateMemberStats(member, assessmentStorApi.findByMemberId(member.id));
        const viewData = {
            member: member,
            assessments: assessmentStorApi.findByMemberId(member.id),
            memberStats: memberStats,
          };
        response.render('assessed', viewData);
      },

    editcomment(request, response) {
      const member = userStorApi.findById(request.params.memberid);
      const assessment = assessmentStorApi.findById(request.params.assessmentid);
      assessment.comment = request.params.comment;
      assessmentStorApi.update(assessment);
      const viewData = {
          member: member,
          members: userStorApi.findAllMembers(),
        };
      response.redirect('/dashboard');
    },

    deletemember: function (request, response) {
        const memberid = request.params.memberid;
        const member = userStorApi.findById(memberid);
        if (member != null) {
          userStorApi.remove(memberid);
        };

        for (var a in assessmentStorApi.findByMemberId(memberid)) {
          assessmentStorApi.remove(a);
        }

        const viewData = {
            member: member,
            members: userStorApi.findAllMembers(),
          };
        response.redirect('/dashboard');
      },
  };

module.exports = dashboard;
