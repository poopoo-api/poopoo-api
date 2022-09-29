module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/api",
        destination: "/api.html"
      },
      {
        source: "/(.*)",
        destination: "/err.html"
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:slug*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*'
          }
        ],
      },
    ]
  },
};