const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const target = process.env.REACT_APP_API_BASE_URL
  //const target = "http://localhost:8080";

  app.use(
    "/api/v1",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};