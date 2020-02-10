const loaderUtils = require("loader-utils"); // 取loader参数用

module.exports = function(source) {
  // 不能用箭头函数
  // source 引入文件的内容
  // 1)
  // console.log(this.query);
  // return source.replace("steven", this.query.name);

  // 2)
  // const options = loaderUtils.getOptions(this);
  // return source.replace("steven", options.name);

  // 3)
  // const options = loaderUtils.getOptions(this);
  // const result = source.replace("steven", options.name);
  // this.callback(null, result);

  // 4) 异步调用 async
  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  setTimeout(() => {
    const result = source.replace("steven", options.name);
    callback(null, result);
  }, 1000);
};

// loder 应用场景
// 异步捕获
// 国际化 loader获取node的全局变量 根据打包版本进行替换
