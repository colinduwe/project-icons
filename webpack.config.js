const path = require('path');

module.exports = {
    entry: './project-icons.js', // Entry point for the file with imports
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'project-icons.min.js', // Output file
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Transpile ES6+ for browser compatibility
                },
            },
        ],
    },
    mode: 'production',
};
