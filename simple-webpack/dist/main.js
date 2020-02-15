
    (function(graph){
        function require(module) {
            function localRequire(relativePath) {
                return require(graph[module].dependencies[relativePath])
            }
            
            var exports = {};
            (function(require, exports, code){
                eval(code)
            })(localRequire, exports, graph[module].code)

            return exports;
        }
        require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./a.js":"./src/a.js","./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\nconsole.log((0, _a.add)(1, 2));\nconsole.log(\"hellow steven\");\nconsole.log(\"simple webpack\"); // console.log(mulitply(5, 6));"},"./src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = exports.add = void 0;\n\nvar add = function add(a, b) {\n  return a + b;\n};\n\nexports.add = add;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;"},"./src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.mulitply = void 0;\n\nvar mulitply = function mulitply(a, b) {\n  return a * b;\n};\n\nexports.mulitply = mulitply;"}})
    