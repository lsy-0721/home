# 鱼裕 · YUYU 个人主页

**线上地址：** https://home.execute.cc.cd/

技术栈：

- [Astro 5](https://astro.build/)（多页静态站点）
- 纯 CSS（无 Tailwind / 无 SCSS）
- 玻璃拟态 + 深空紫蓝风
- 构建产物纯静态，可托管到任意静态平台

## 本地开发

```bash
pnpm install
pnpm dev          # 启动 :4322
```

## 构建

```bash
pnpm build        # 输出到 dist/
pnpm preview      # 预览生产构建
```

## 部署

部署走 **Cloudflare Pages**，**由 Cloudflare 直接连接 GitHub 仓库自动构建和部署**：

- 推送到 `main` 分支 → Cloudflare Pages 自动构建（`pnpm install && pnpm build`）→ 自动发布到 `home.execute.cc.cd/`
- 不需要 GitHub Actions、也不需要 API Token

详细配置和 secret 信息见 [DEPLOY.md](DEPLOY.md)。

## 项目结构

```
src/
├── components/         # Card / Panel / Footer / Stars
├── data/               # 站点配置 + 内容数据（site.ts、content.ts）
├── layouts/            # BaseLayout.astro 统一 head/SEO/footer
├── pages/              # 路由
└── styles/             # global.css 唯一入口
public/
├── _headers            # CF Pages / Netlify 缓存与安全头
├── _redirects          # 301 重定向 /blog → 博客
├── favicon.svg
└── robots.txt
deploy/
├── Dockerfile          # 多阶段镜像
└── nginx.conf.example  # 自有服务器配置
.github/workflows/ci.yml
pnpm-workspace.yaml     # pnpm 10+ 必需（packages + allowBuilds 白名单）
wrangler.toml           # Cloudflare Pages 项目声明
```

## License

MIT — 鱼裕 / YUYU
