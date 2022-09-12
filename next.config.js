/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.moralis.io", "www.footballdatabase.eu"],
  },
  env: {
    // APP ID & SERVERURL
    NEXT_APP_MORALIS_SERVER_URL:
      "https://fscxsw3halcr.usemoralis.com:2053/server",
    NEXT_APP_ID: "PwE9zZL74dyQiIdDo5qFP1uUIkq6xTVgiP9ul7Fb",
  },
};
