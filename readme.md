## ⭐️ What

Align number, reduce the calculation error.

Get `0.1 + 0.2` as `0.3`

It seems like `toFixed`, but it will only shift while delta is under `1e-8`.

## 📦 Getting Started

**Installation**

```shell
npm install approx-fix
# or
yarn add approx-fix
```

**Usage**

`approxFix(value, [precision = 2])`

`precision == 2` is similar to `toFixed(2)`,  
it means the number of digits to appear after the decimal point.

```javascript
// * there are two functions
// * support cjs and esm
// * support object recursion way

// * ---------------- cjs
const { approxFix, approxFixNum } = require('approx-fix');
approxFix([0.1 + 0.2]); // => [0.3]

// * ---------------- esm
// * default is approxFix
import approxFix from 'approx-fix';
approxFix(0.1 + 0.2); // => 0.3
```

---

## 💡 Why

IEEE754 problem.

```javascript
0.2 + 0.1 === 0.30000000000000004;
Math.sin(Math.PI) === 1.2246467991473532e-16;
```

And I want to really get the normal result,  
Primarily for the the trigonometric functions,

So I write the lib to save some time.

Well, it's not prefect or totally accurate,  
it's just a quick simple auto fix which works for some value.  
But it's good enough for my usage.

## 📖 Description

there are two methods

-   `approxFixNum`
-   `approxFix`

`approxFixNum` only supports for number values.

`approxFix` is a wrapper of `approxFixNum`,  
which will support _any_ type of data you pass auto-recursively,  
and call `approxFixNum` while meet number.

(real Number. number string is not well tested and supported)

**Rules**

While the delta between your number and the _'toFixed'_ number of it, is under 1e-8,  
It will return the fixed number.

Else it should return the same value.

---

## ⌨️ Contribution

```shell
# git clone and cd into it
git clone https://github.com/seognil-lab/approx-fix

# npm command
npm i
npm run test:watch
```

---

## 📜 References

https://0.30000000000000004.com/

---

## 🕗 TODO
