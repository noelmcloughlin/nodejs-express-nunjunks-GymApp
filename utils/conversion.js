
'use strict';

const conversion = {

    rounded(numberToConvert, precision) {
      let p = Math.pow(10, precision);
      return Math.round(numberToConvert * p / p);
    },

    convertMetresToInches(numberToConvert, precision) {
      return this.rounded(numberToConvert * 39.37, precision);
    },
  };

module.exports = conversion;
