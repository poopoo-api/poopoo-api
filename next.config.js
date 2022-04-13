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
        destination: "/404.html"
      },
    ];
  },
};