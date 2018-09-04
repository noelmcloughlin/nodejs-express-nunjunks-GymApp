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
          return;

        } else if (user.role == 'trainer') {
          let viewData = {
              id: 'dashboard',
              trainer: user,
              user: user,
              users: userStorApi.findAll(),
            };
          response.render('dashboard', viewData);

        } else if (user.role == 'member') {
          let viewData = {
              id: 'dashboard',
              member: user,
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
        const memberId = request.params.memberid;
        const member = userStorApi.findById(memberId);
        if (member) {
          const assessmentId = request.params.assessmentid;
          const assessment = assessmentStorApi.findById(assessmentid);
          assessmentStorApi.remove(assessmentId);
          response.redirect('/dashboard');
        }
      },

    trainerassessment: function (request, response) {
        const trainer = accountsApi.getLoggedInUser();
        const member = userStorApi.findById(request.param.id);
        const memberStats = analyticsApi.generateMemberStats(member, assessmentStorApi.findByMemberId(member.id));
        const viewData = {
            title: 'Trainer Dashboard',
            id: 'trainerassessment',
            member: member,
            assessments: assessmentStorApi.findByMemberId(member.id),
            memberStats: memberStats,
          };
        response.render(viewData.id, viewData);
      },

    editcomment(request, response) {
      const trainer = accountsApi.getLoggedInUser(request);
      const member = userStorApi.findById(request.param.id);
      const assessment = assessmentStorApi.findById(request.param.id);
      assessment.comment = request.param.comment;
      assessments.update(assessment);
      const viewData = {
          title: 'Trainer Dashboard',
          id: 'dashboard',
          trainer: trainer,
          member: member,
          members: members.findAll(),
        };
      response.redirect(viewData.id);
    },

    deletemember: function (request, response) {
        const trainer = accountsApi.getLoggedInUser(request);
        const memberId = request.param.id;
        const member = userStorApi.findById(memberId);
        if (member != null) {
          members.delete(memberId);
        };

        const assessments = assessmentStorApi.findByMemberId(memberId);
        for (a in assessements) {
          assessments.delete(a);
        }

        //
        //Delete member stats too
        //
        const viewData = {
            title: 'trainer Dashboard',
            id: 'dashboard',
            trainer: trainer,
            member: member,
            members: members.findAll(),
          };
        response.redirect(viewData.id);
      },
  };

module.exports = dashboard;
