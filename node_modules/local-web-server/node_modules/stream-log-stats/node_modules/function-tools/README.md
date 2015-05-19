[![view on npm](http://img.shields.io/npm/v/function-tools.svg)](https://www.npmjs.org/package/function-tools)
[![npm module downloads per month](http://img.shields.io/npm/dm/function-tools.svg)](https://www.npmjs.org/package/function-tools)
[![Build Status](https://travis-ci.org/75lb/function-tools.svg?branch=master)](https://travis-ci.org/75lb/function-tools)
[![Dependency Status](https://david-dm.org/75lb/function-tools.svg)](https://david-dm.org/75lb/function-tools)

<a name="module_function-tools"></a>
#function-tools
Useful higher-order functions

**Example**  
```js
var f = require("function-tools");
```

<a name="module_function-tools.throttle"></a>
##f.throttle(f, [options])
Guarantees a function a specified `restPeriod` in between invocations.

**Params**

- f `function` - the function to throttle  
- \[options\] `Object` - the options  
  - \[restPeriod\] `number` - a value in ms  

**Returns**: `function`  
**Example**  
```js
var throttled = f.throttle(myFunction, { restPeriod: 200 });
throtted(); // this will only execute if at least 200ms since the last invocation
```

