const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'SimpleChatClient'
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};