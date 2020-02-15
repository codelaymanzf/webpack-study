const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = class Webapck {
  constructor(options) {
    let { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    // 开始分析入口模块
    const info = this.parse(this.entry);
    console.log(info);

    this.modules.push(info);

    // 生成依赖图谱
    this.modules.forEach(item => {
      const { dependencies } = item;
      if (dependencies) {
        for (let d in dependencies) {
          this.modules.push(this.parse(dependencies[d]));
        }
      }
    });

    console.log(this.modules);

    // 数据结构转换
    const obj = {};
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      };
    });

    console.log("obj", obj);
    // 输出文件
    this.emitFile(obj);
  }

  parse(entryFile) {
    const content = fs.readFileSync(entryFile, "utf-8");

    // 使用@babel/parser分析内容，返回ast抽像语法树
    const ast = parser.parse(content, {
      sourceType: "module"
    });

    // 提取依赖路径
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        // console.log(node);
        //node.source.value 这个路径是相对于入口的相对路径
        const newPathName =
          "./" + path.join(path.dirname(entryFile), node.source.value);
        dependencies[node.source.value] = newPathName;
      }
    });
    // console.log(dependencies);

    // 代码编译
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    });

    // 信息汇总 返回
    return {
      entryFile,
      dependencies,
      code
    };
  }

  emitFile(code) {
    //生成bundle.js =》dist/main.js
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    const bundle = `
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
        require('${this.entry}')
    })(${newCode})
    `;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
