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
          const assessmentList = assessmentStorApi.findByMemberId(user.id);

          const viewData = {
              user: user,
              assessmentList: assessmentList,
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
          assessment.comment = '';
          assessment.memberid = member.id;
          if (assessmentStorApi.add(assessment)) {
            console.log('Assessment added');
            const memberStats = analyticsApi.generateMemberStats(member, assessmentStorApi.findByMemberId(member.id));
            assessment.trend = memberStats.trend;
          }
        }

        response.redirect('/dashboard');
      },

    deleteassessment: function (request, response) {
        const member = userStorApi.findById(request.params.memberid);
        const assessmentid = request.params.assessmentid;
        const assessment = assessmentStorApi.findById(assessmentid);
        if (assessmentStorApi.remove(assessmentid)) {
          console.log('Assessement removed');
          response.redirect('/dashboard');
        }
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
      console.log('response.body.comment ', request.body.comment);
      assessment.comment = request.body.comment;
      if (assessmentStorApi.update(assessment)) {
        const viewData = {
            member: member,
            members: userStorApi.findAllMembers(),
          };
        console.log('Comment updated');
      }

      response.redirect('/dashboard');
    },

    deletemember: function (request, response) {
        const member = userStorApi.findById(request.params.memberid);
        if (member && userStorApi.remove(member.id)) {
          for (var thing in assessmentStorApi.findByMemberId(member.id)) {
            assessmentStorApi.remove(thing);
          }

          console.log('Member removed');
          const viewData = {
              member: member,
              members: userStorApi.findAllMembers(),
            };
          response.redirect('/dashboard');
        }
      },
  };

module.exports = dashboard;
