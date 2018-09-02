'use strict';

// noinspection JSAnnotator
/**
 * The category is determined by the magnitude of the members BMI according to the following:
 *
 *     BMI less than    15   (exclusive)                      is "VERY SEVERELY UNDERWEIGHT"
 *     BMI between      15   (inclusive) and 16   (exclusive) is "SEVERELY UNDERWEIGHT"
 *     BMI between      16   (inclusive) and 18.5 (exclusive) is "UNDERWEIGHT"
 *     BMI between      18.5 (inclusive) and 25   (exclusive) is "NORMAL"
 *     BMI between      25   (inclusive) and 30   (exclusive) is "OVERWEIGHT"
 *     BMI between      30   (inclusive) and 35   (exclusive) is "MODERATELY OBESE"
 *     BMI between      35   (inclusive) and 40   (exclusive) is "SEVERELY OBESE"
 *     BMI greater than 40   (inclusive)                      is "VERY SEVERELY OBESE"
 */

const bmi = {
    bmiScale: Object.freeze({
        VERY_SEVERELY_UNDERWEIGHT: '15.0',
        SEVERELY_UNDERWEIGHT: '16.0',
        UNDERWEIGHT: '18.5',
        NORMAL: '25',
        OVERWEIGHT: '30',
        MODERATELY_OBESE: '35',
        SEVERELY_OBESE: '40',
        VERY_SEVERELY_OBESE: '1000', }),

    bmiCategory(bmiValue)
    {
      if (bmiValue < Number(bmi.VERY_SEVERELY_UNDERWEIGHT))
          return 'Very Severely Underweight';
      else if (bmiValue < Number(bmi.SEVERELY_UNDERWEIGHT))
          return 'Severely Underweight';
      else if (bmiValue < Number(bmi.UNDERWEIGHT))
          return 'Underweight';
      else if (bmiValue < Number(bmi.NORMAL))
          return 'Normal';
      else if (bmiValue < Number(bmi.OVERWEIGHT))
          return 'Overweight';
      else if (bmiValue < Number(bmi.MODERATELY_OBESE))
          return 'Moderately Obese';
      else if (bmiValue < Number(bmi.SEVERELY_OBESE))
          return 'Severely Obese';
      else if (bmiValue < Number(bmi.VERY_SEVERELY_OBESE))
          return 'Very Severely Obese';
    },

  };

module.exports = bmi;
