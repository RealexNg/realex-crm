/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: [
  //       { loader: "@svgr/webpack", options: { icon: true } },
  //       { loader: "url-loader" },
  //     ],
  //   });

  //   return config;
  // },
  images: {
    domains: ["res.cloudinary.com", "images.pexels.com", "www.mystore.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",

    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     port: "",

    //     hostname: "images.pexels.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     port: "",

    //     hostname: "www.mystore.com",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
