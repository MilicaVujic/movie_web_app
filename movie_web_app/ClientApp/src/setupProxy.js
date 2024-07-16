const { createProxyMiddleware } = require('http-proxy-middleware');

const target = "https://192.168.0.25:44430"; // Postavi target na ciljni server

const context = ['/api']; // Definiraj context na kojim putanjama želiš primjenjivati proxy

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
};

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        onError: onError,
        proxyTimeout: 10000,
        secure: false, 
        headers: {
            Connection: 'Keep-Alive',
                }
    });

    app.use(appProxy);
};
