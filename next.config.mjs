/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flagsapi.com",
      },
      {
        hostname: "openweathermap.org",
      },
      {
        hostname: "images.hdqwalls.com",
      }
    ]





  }
};

export default nextConfig;
