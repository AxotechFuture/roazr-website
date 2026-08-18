import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // The Meta Winners Vault lead magnet is a self-contained static document
      // (its own styles and inline JS, none of the site chrome), so it lives in
      // /public and is served straight off the CDN. The rewrite gives it the
      // clean, shareable URL without the .html suffix; the file carries a
      // canonical tag pointing here so the two paths do not split ranking.
      { source: "/free-winning-ads", destination: "/free-winning-ads.html" },
    ];
  },
};

export default nextConfig;
