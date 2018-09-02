'use strict';

const accounts = require('./accounts.js');
const members = require('../models/members');
const assessments = require('../models/assessments');
const trainers = require('../modesl/trainers');
const logger = require('../utils/logger');
const uuid = require('uuid');

const trainerdashboard = {
    index(request, response) {
      const trainer = accounts.getLoggedInTrainer();
      const viewData = {
          title: 'Trainer Dashboard',
          id: 'trainerdashboard',
          members: members.findAll(),
        };
      response.render(viewData.id, viewData);
    },

    trainerassessment: function (request, response) {
        const trainer = accounts.getLoggedIntrainer();
        const member = members.findById(request.param.id);
        const assessments = member.assessments;
        const memberStats = analytics.generateMemberStats(member);
        Collections.reverse(assessments);
        const viewData = {
            title: 'Trainer Dashboard',
            id: 'trainerassessment',
            member: member,
            assessments: assessments.findByMemberId(member.id),
            memberStats: memberStats,
          };
        response.render(viewData.id, viewData);
      },

    editComment(request, response) {
      const trainer = accounts.getLoggedIntrainer();
      const member = members.findById(request.param.id);
      const assessment = assessments.findById(request.param.id);
      assessment.comment = request.param.comment;
      assessments.update(assessment);
      const viewData = {
          title: 'Trainer Dashboard',
          id: 'trainerdashboard',
          members: members.findAll(),
        };
      response.render(viewData.id, viewData);
    },

    deletemember: function (request, response) {
        const trainer = accounts.getLoggedIntrainer();
        const memberId = request.param.id;
        const member = members.findById(memberId);
        if (member != null) {
          members.delete(memberId);
        };

        const assessments = assessments.findByMemberId(memberId);
        for (a in assessements) {
          assessments.delete(a);
        }

        //
        //Delete member stats too
        //
        const viewData = {
            title: 'trainer Dashboard',
            id: 'trainerdashboard',
            members: members.findAll(),
          };
        response.render(viewData.id, viewData);
      },
  };

module.exports = trainerdashboard;
