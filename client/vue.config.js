const path = require('path');

module.exports = {
    // when we build the vue app, it will build to the server folder
    outputDir: path.resolve(__dirname, '../server/public'), 
    devServer: { 
        proxy: {
            /* so when using axios, the url is appended to 
            the one below depending on the server running */
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    }
}