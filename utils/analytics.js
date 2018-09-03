'use script';

const stats = require('./memberstats');
const conversion = require('./conversion');
const bmi = require('./bmi');

const analytics = {
    generateMemberStats(member, assessments) {
      if (assessments) {
        let weight = Number(member.startingweight);
        let num = assessments.size;
        if (num > 0) {
          const assessment = assessments.get(num - 1);    // get latest assessment
          weight = Number(assessment.weight);

          stats.bmi = calculateBMI(member, weight);
          stats.bmiCategory = determineBMICategory(stats.bmi);
          stats.isIdealBodyweight = isIdealBodyWeight(member, weight);
          stats.trend = true;
          if (num > 1) {
            stats.trend = assessments.get(num - 2).weight > assessments.get(num - 1).weight;
          }
        }
      }

      return stats;
    },

    calculateBMI(member, weight) {
      if (Number(member.height) <= 0)
          return 0;
      else
          return conversion.round((Number(weight) / Math.pow(Number(member.height), 2), 2));
    },

    determineBMICategory(bmiValue) {
      return bmi.bmiScale(bmi.Value);
    },

    isIdealBodyWeight(member, weight)
    {
      fiveFeet = 60.0;
      idealBodyWeight;
      inches = conversion.convertMetresToInches(member.height, 2);

      if (inches <= fiveFeet) {
        if (member.gender.equals('M')) {
          idealBodyWeight = 50;
        } else {
          idealBodyWeight = 45.5;
        }
      } else {
        if (member.gender.equals('M')) {
          idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
        } else {
          idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
        }
      }

      return ((idealBodyWeight <= (weight + 2.0)) && (idealBodyWeight >= (weight - 2.0))
      );
    },
  };

module.exports = analytics;
