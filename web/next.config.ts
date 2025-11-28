import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["he", "ru"],
    defaultLocale: "he",
  },
};

export default nextConfig;
