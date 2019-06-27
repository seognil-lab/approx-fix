'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fp = require('lodash/fp');
var isEqualApprox = require('is-equal-approx');

var approxFixNum = function approxFixNum(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  // * -0
  if (num === 0) return 0;
  precision = Math.pow(10, precision);
  var soft = Math.round(num * precision) / precision;
  return isEqualApprox.isEqualApproxNum(soft, num, 1e-8) ? soft : num;
};

var approxFix = function approxFix(val, precision) {
  if (fp.isNumber(val)) {
    return approxFixNum(val, precision);
  } else if (fp.isObject(val)) {
    for (var key in val) {
      val[key] = approxFix(val[key], precision);
    }

    return val;
  } else {
    return val;
  }
};

exports.approxFix = approxFix;
exports.approxFixNum = approxFixNum;
exports.default = approxFix;
//# sourceMappingURL=index.js.map
