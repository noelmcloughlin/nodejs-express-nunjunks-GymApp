'use strict';

const assessmentStorApi = require('../models/assessments');
const userStorApi = require('../models/users');
const goalsApi = require('../models/goals');
const accountsApi = require('./accounts');
const analyticsApi = require('../utils/analytics');
const dateFormat = require('dateformat');

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
          const goalList = goalsApi.findByMemberId(user.id);

          const viewData = {
            user: user,
            assessmentList: assessmentList.reverse(),
            goalList: goalList.reverse(),
            memberStats: analyticsApi.generateMemberStats(user, goalsApi.findByMemberId(user.id), assessmentStorApi.findByMemberId(user.id)),
          };

          response.render('dashboard', viewData);
        }
      },

    addassessment: function (request, response) {
        const member = accountsApi.getLoggedInUser(request);
        if (member) {
          const assessment = request.body;
          assessment.id = uuid();
          assessment.date = dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss');
          assessment.comment = '';
          assessment.memberid = member.id;
          const memberStats = analyticsApi.generateMemberStats(member, goalsApi.findByMemberId(member.id), assessmentStorApi.findByMemberId(member.id));
          assessment.trend = memberStats.trend;
          if (assessmentStorApi.add(assessment)) {
            console.log('Assessment added');
          }
        }

        response.redirect('/dashboard');
      },

    addgoal: function (request, response) {
        const member = accountsApi.getLoggedInUser(request);
        if (member) {
          const goal = request.body;
          goal.id = uuid();
          goal.date = dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss');
          goal.memberid = member.id;
          const memberStats = analyticsApi.generateMemberStats(member, goalsApi.findByMemberId(member.id), assessmentStorApi.findByMemberId(member.id));
          goal.trend = memberStats.goaltrend;
          if (goalsApi.add(goal)) {
            console.log('Goal added');
          }
        }

        response.redirect('/dashboard');
      },

    deleteassessment: function (request, response) {
        const assessmentid = request.params.assessmentid;
        const assessment = assessmentStorApi.findById(assessmentid);
        if (assessment && assessmentStorApi.remove(assessmentid)) {
          console.log('Assessement removed');
        }

        response.redirect('/dashboard');
      },

    deletegoal: function (request, response) {
        const goalid = request.params.goalid;
        const goal = goalsApi.findById(goalid);
        if (goal && goalsApi.remove(goalid)) {
          console.log('Goal removed');
        }

        response.redirect('/dashboard');
      },

    assessed: function (request, response) {
        const member = userStorApi.findById(request.params.memberid);
        const memberStats = analyticsApi.generateMemberStats(member, goalsApi.findByMemberId(member.id), assessmentStorApi.findByMemberId(member.id));
        const viewData = {
            member: member,
            assessmentList: assessmentStorApi.findByMemberId(member.id).reverse(),
            goalList: goalsApi.findByMemberId(member.id).reverse(),
            memberStats: memberStats,
          };
        response.render('assessed', viewData);
      },

    editcomment(request, response) {
      const member = userStorApi.findById(request.params.memberid);
      const assessment = assessmentStorApi.findById(request.params.assessmentid);
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

    editcriteria(request, response) {
      const member = userStorApi.findById(request.params.memberid);
      const goal = goalsApi.findById(request.params.goalid);
      goal.criteria = request.body.criteria;
      if (goalsApi.update(goal)) {
        const viewData = {
            member: member,
            members: userStorApi.findAllMembers(),
          };
        console.log('Criteria updated');
      }

      response.redirect('/dashboard');
    },

    deletemember: function (request, response) {
        const member = userStorApi.findById(request.params.memberid);
        if (member && userStorApi.remove(member.id)) {
          for (var thing in assessmentStorApi.findByMemberId(member.id)) {
            assessmentStorApi.remove(thing);
          }

          for (var thing in goalsrApi.findByMemberId(member.id)) {
            goalsApi.remove(thing);
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
