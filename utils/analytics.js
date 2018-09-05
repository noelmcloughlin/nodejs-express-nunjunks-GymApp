'use script';

const stats = require('./memberstats');
const conversion = require('./conversion');
const bmi = require('./bmi');

const analytics = {

    calculateBMI(member, weight) {
      if (Number(member.height) <= 0)
          return 0;
      else {
        return conversion.rounded((weight / (member.height * member.height)), 2);
      }
    },

    determineBMICategory(bmiValue) {
      return bmi.bmiCategory(bmiValue);
    },

    isIdealBodyWeight(member, weight)
    {
      const fiveFeet = 60.0;
      let idealBodyWeight = 0;
      const inches = conversion.convertMetresToInches(member.height, 2);

      if (inches <= fiveFeet) {
        if (member.gender.toLowerCase() == 'm') {
          idealBodyWeight = 50;
        } else {
          idealBodyWeight = 45.5;
        }
      } else {
        if (member.gender.toLowerCase() == 'm') {
          idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
        } else {
          idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
        }
      }

      return ((idealBodyWeight <= (weight + 2.0)) && (idealBodyWeight >= (weight - 2.0))
      );
    },

    generateMemberStats(member, goals, assessments) {
      let weight = Number(member.startingweight);
      let num = assessments.length;
      if (num > 0) {
        const assessment = assessments[num - 1];    // get latest assessment
        stats.bmi = this.calculateBMI(member, Number(assessment.weight));
        stats.bmiCategory = this.determineBMICategory(Number(stats.bmi));
        stats.isIdealBodyweight = this.isIdealBodyWeight(member, weight);
        stats.trend = true;
        if (num > 1) {
          stats.trend = assessments[num - 2].weight > assessments[num - 1].weight;
        }

        stats.goaltrend = true;
      };

      num = goals.length;
      if (num > 0) {
        const goal = goals[num - 1];    // get latest goal
        stats.goaltrend = true;
      };

      return stats;
    },
  };

module.exports = analytics;
