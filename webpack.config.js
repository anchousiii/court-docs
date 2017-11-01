var path = require('path')
var webpack = require('webpack')
module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: { //Обновлено

        rules: [
            {
                loader: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
                test: /\.js$/,
                options: {
                    plugins: [
                        'react-hot-loader/babel'
                    ]
                }

            }
        ]
    }
}