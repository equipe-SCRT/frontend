const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/localhost:8080',
        createProxyMiddleware({
            target: 'http://10.0.3.247:8080',
            changeOrigin: true,
        })
    );
};