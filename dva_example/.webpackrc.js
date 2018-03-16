export default {
//  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://localhost:8000/",
      "changeOrigin": true,
      "pathRewrite": {"^/api": ""},
    }
  },
}
