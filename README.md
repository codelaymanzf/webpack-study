## 简易webpack
### 实现的功能
- 可以将ES6语法转换成ES5语法
  - 通过`babylon`生成AST
  - 通过`bable-core`将AST重新生成源码

- 可以分析模块之间的依赖关系
  - 通过`babel-traverse`的`ImportDeclaration`方法获取依赖属性
- 生成的JS文件可以在浏览器中运行


<br>

## 自定义 loader

https://webpack.js.org/contribute/writing-a-loader/

`cd make-loader`

`npm install`

`npm run build`

### 注意事项：

- loader 函数不能是箭头函数，`this`指向原因
- loader 函数必须有返回值，否则会报错
- 获取参数调用`this.query`
- 异步方法调用`this.async()`结合`callback`

### 使用方式：

- 方法一：绝对路径

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                     {
                        loader: path.resolve(__dirname, "./loaders/replaceLoader.js")`
                    }
                ]
            }
        ]
    }
}

```

- 方法二：直接使用 loader 名, 添加`resolveLoader`配置

```js
module.exports = {
    resolveLoader: {
        modules: ["node_modules", "./loaders"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                     {
                        loader: path.resolve(__dirname, "./loaders/replaceLoader.js")`
                    }
                ]
            }
        ]
    }
}
```

### 应用场景

- 国际化（loader 获取 node 的全局变量 根据打包版本进行替换）

<br>

## 自定义 plugin

https://webpack.js.org/contribute/writing-a-plugin/

`cd make-plugin`

`npm install`

`npm run build`

