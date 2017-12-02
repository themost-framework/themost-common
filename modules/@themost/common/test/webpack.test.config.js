var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        'module':'./modules/@themost/common/test/browser/CommonTest.spec.js'
    },
    output: {
        filename: 'modules/@themost/common/test/browser/CommonTest.spec.bundle.js'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js' ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {

    }
};