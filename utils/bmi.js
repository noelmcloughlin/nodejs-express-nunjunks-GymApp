'use strict';

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

//first index (inclusive) second index (exclusive)
const bmi = {
    VERY_SEVERELY_UNDERWEIGHT: {
        lower: 0.0,
        upper: 15.0,
        description() {
          return 'Very Severely Underweight';
        },
      },

    SEVERELY_UNDERWEIGHT: {
        lower: 15.0,
        upper: 16.0,
        description() {
          return 'Severely Underweight';
        },
      },

    UNDERWEIGHT: {
        lower: 16.0,
        upper: 18.5,
        description() {
          return 'Underweight';
        },
      },

    NORMAL: {
        lower: 18.5,
        upper: 25.0,
        description() {
          return 'Normal';
        },
      },

    OVERWEIGHT: {
        lower: 25.0,
        upper: 30.0,
        description() {
          return 'OverWeight';
        },
      },

    MODERATELY_OBESE: {
        lower: 30.0,
        upper: 35.0,
        description() {
          return 'Moderately Obese';
        },
      },

    SEVERELY_OBESE: {
        lower: 35.0,
        upper: 40.0,
        description() {
          return 'Severely Obese';
        },
      },

    VERY_SEVERELY_OBESE: {
        lower: 40.0,
        upper: 1000.0,
        description() {
          return 'Very Severely Obese';
        },
      },

    rangeLow: 0,
    rangeHigh: 0,
    set(low, high) {
      this.rangeLow = low;
      this.rangeHigh = high;
    },

    bmiCategory(bmiValue) {
      if ((bmiValue >= this.rangeLow) && (bmiValue < this.rangeHigh))
        return true;
      return false;
    },
  };
