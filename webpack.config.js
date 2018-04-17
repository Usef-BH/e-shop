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
            },
            {
                test: /\.(jpe?g|png|gif)/,
                use: 'file-loader',
            }
        ]
    },
    devServer: {
        port: 9999,
        useLocalIp: true,
        allowedHosts: [
            '192.168.0.171',
            '192.168.0.119'
        ],
        host: "0.0.0.0",
        contentBase: path.join(__dirname, 'static')
    }
}