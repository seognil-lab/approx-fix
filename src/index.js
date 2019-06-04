import { isNumber, isObject } from 'lodash/fp';

import { isEqualApproxNum } from 'is-equal-approx';

const approxFixNum = (num, precision = 2) => {
    // * -0
    if (num === 0) return 0;

    precision = Math.pow(10, precision);
    const soft = Math.round(num * precision) / precision;
    return isEqualApproxNum(soft, num, 1e-8) ? soft : num;
};

const approxFix = (val, precision) => {
    if (isNumber(val)) {
        return approxFixNum(val, precision);
    } else if (isObject(val)) {
        for (const key in val) {
            val[key] = approxFix(val[key], precision);
        }
        return val;
    } else {
        return val;
    }
};

export default approxFix;

export { approxFix, approxFixNum };
