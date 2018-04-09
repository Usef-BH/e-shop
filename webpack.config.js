let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app/index.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                        'style-loader', 
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[local]__[name]__[hash:base64:5]',
                            }
                        }                    
                ]
            }
        ]
    },
    devServer: {
        port: 9999,
        contentBase: path.join(__dirname, 'static')
    }
}