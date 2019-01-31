// 一个常见的`webpack`配置文件
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../', "packages/index.js"), //已多次提及的唯一入口文件
    output: {
        libraryTarget: 'umd', // 如果没有这个配置，打包后的模块不能被外部引入！！！
        path: path.resolve(__dirname, '../', 'lib'),
        filename: "index.js"
    },
    devtool: 'none',
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }]
    }
}