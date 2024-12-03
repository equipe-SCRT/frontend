const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            target: 'http://10.0.3.176:8080',
            changeOrigin: true,
        })
    );
};
