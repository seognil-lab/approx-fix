const { checkEqual } = require('@seognil-lab/chai-helper');
const { approxFixNum, approxFix } = require('../dist/index.cjs');

describe('approxFixNum', () => {
    it('number', () => {
        checkEqual(approxFix(0.12301, 3), 0.12301); // => 0.12301
        checkEqual(approxFix(0.1230000001, 3), 0.123); // => 0.123
    });
});

describe('approxFixNum', () => {
    it('number', () => {
        checkEqual(approxFixNum(0.120000000000001), 0.12);
        checkEqual(approxFixNum(272.00000000000006), 272);
    });
    it('number with precision', () => {
        checkEqual(approxFixNum(0.123000000000001, 3), 0.123);
        checkEqual(approxFixNum(272.00000000000006, 3), 272);
    });
    it('number, () => false', () => {
        checkEqual(approxFixNum(0.123030000000001, 3), 0.123, false);
    });
});

describe('approxFix', () => {
    it('number', () => {
        checkEqual(approxFix(0.120000000000001), 0.12);
        checkEqual(approxFix([272.00000000000006]), [272]);
    });

    it('number, () => false', () => {
        checkEqual(approxFix(0.120300000000001), 0.12, false);
        checkEqual(approxFix([272.00300000000006]), [272], false);
    });

    it('array', () => {
        const dirty2 = 0.120000000000001;
        const clean2 = 0.12;
        checkEqual(approxFix([1, dirty2, 2]), [1, clean2, 2]);
        checkEqual(approxFix([1, [dirty2, 2]]), [1, [clean2, 2]]);
    });

    it('array, () => false', () => {
        const dirty2 = 0.120300000000001;
        const clean2 = 0.12;
        checkEqual(approxFix([1, dirty2, 2]), [1, clean2, 2], false);
        checkEqual(approxFix([1, [dirty2, 2]]), [1, [clean2, 2]], false);
    });

    it('object', () => {
        const dirty2 = 0.120000000000001;
        const clean2 = 0.12;
        checkEqual(approxFix({ a: dirty2, b: 2 }), { a: clean2, b: 2 });
        checkEqual(approxFix({ a: { c: dirty2 }, b: 2 }), { a: { c: clean2 }, b: 2 });
        checkEqual(approxFix({ a: { c: [dirty2, 3] }, b: 2 }), { a: { c: [clean2, 3] }, b: 2 });
        checkEqual(approxFix([{ c: [dirty2, 3] }, 2]), [{ c: [clean2, 3] }, 2]);
    });

    it('object, () => false', () => {
        const dirty2 = 0.120300000000001;
        const clean2 = 0.12;
        checkEqual(approxFix({ a: dirty2, b: 2 }), { a: clean2, b: 2 }, false);
        checkEqual(approxFix({ a: { c: dirty2 }, b: 2 }), { a: { c: clean2 }, b: 2 }, false);
        checkEqual(
            approxFix({ a: { c: [dirty2, 3] }, b: 2 }),
            { a: { c: [clean2, 3] }, b: 2 },
            false,
        );
        checkEqual(approxFix([{ c: [dirty2, 3] }, 2]), [{ c: [clean2, 3] }, 2], false);
    });
});

describe('NaN null undefined boolean string', () => {
    it('should return the same value', () => {
        checkEqual(approxFix(NaN), NaN);
        checkEqual(approxFix(null), null);
        checkEqual(approxFix(undefined), undefined);
        checkEqual(approxFix(false), false);
        checkEqual(approxFix(true), true);
        checkEqual(approxFix('str'), 'str');
        checkEqual(approxFix(0), 0);
    });
});
