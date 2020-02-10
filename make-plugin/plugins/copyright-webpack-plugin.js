class CopyRightWebpackPlgin {
  constructor(options) {
    console.log("plugin has been used");
  }
  // compiler 是 webpack的实例
  apply(compiler) {
    compiler.hooks.compile.tap("CopyRightWebpackPlgin", compilation => {
      console.log("sync compile");
    });
    // compilation 跟此次打包相关的内容
    compiler.hooks.emit.tapAsync("CopyRightWebpackPlgin", (compilation, cb) => {
      //   console.log(compilation.assets);
      debugger;
      compilation.assets["copyright.txt"] = {
        source: function() {
          return "copyright by steven zhang";
        },
        size: function() {
          return 25;
        }
      };
      cb();
    });
  }
}

module.exports = CopyRightWebpackPlgin;
