// const loaderUtils = require("loader-utils"); // 取loader参数用

module.exports = function(source) {
  const result = source.replace("test", "test2");
  return result;
};
