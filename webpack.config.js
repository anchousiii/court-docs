var path = require('path')
var webpack = require('webpack')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
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
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, "src"),
                ],
                options: {
                    plugins:[
                        'react-hot-loader/babel'
                    ]
                }

            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"}

        ]

    }
}