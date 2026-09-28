import { defineConfig } from "astro/config";

// public URL where this site is hosted.
// 部署到 home.execute.cc.cd 时，默认 site 就是它；
// 如要临时把部署到其他域名（例如 preview/preview-staging）可以用环境变量覆盖：
//   SITE_URL=https://staging.example.com pnpm build
const SITE = process.env.SITE_URL || "https://home.execute.cc.cd/";

export default defineConfig({
  site: SITE,
  // 子域部署不需要 base；Astro 会用 site + 路径生成规范链接。
  trailingSlash: "ignore",
  build: {
    // 生成 /about/index.html 这种目录形式，对静态托管、Nginx、子域部署都友好
    format: "directory",
  },
  server: {
    port: 4322,
  },
});
