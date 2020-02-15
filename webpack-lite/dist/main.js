
    (function(modules){
        function require(fileName) {
            const fn = modules[fileName];
            const module = {
                exports: {}
            }

            fn(require, module, module.exports)

            return module.exports;
        }

        require('/Users/zhangfeng/Documents/study/webpack-study/webpack-lite/src/index.js')
    })({'/Users/zhangfeng/Documents/study/webpack-study/webpack-lite/src/index.js': function(require, module, exports){ "use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)("Steven"));},'./greeting.js': function(require, module, exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

var _math = require("./math");

function greeting(name) {
  //   return "hello " + name;
  return "hello " + name + " " + (0, _math.add)(1, 2);
}},})
    