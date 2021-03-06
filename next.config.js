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
  /*async headers() {
    return [
      {
        source: '/svg',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
        ],
      },
    ]
  },*/
};