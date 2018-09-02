
'use strict';

const conversion = {
    round(numberToConvert, precision) {
      const p = Math.pow(10, precision);
      return Math.round(numberToConvert * p) / p;
    },

    convertKGtoPounds(numberToConvert, precision) {
      return round(numberToConvert * 2.2, precision);
    },

    convertMetresToInches(numberToConvert, precision) {
      return round(numberToConvert * 39.37, precision);
    },
  };

module.exports = conversion;
