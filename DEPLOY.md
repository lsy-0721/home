# 部署指南 — home

本项目部署到 **https://home.execute.cc.cd/** 子域。
构建产物：`pnpm build` 出来的 `dist/` 目录。

---

## 0. 一键出包（本机操作）

```bash
pnpm install
pnpm build         # 输出 dist/
```

如果想预览生产构建：
```bash
pnpm preview       # 默认起 :4321
```

> 想把站点临时打到别的域名？
> ```bash
> SITE_URL=https://staging.example.com pnpm build
> ```

---

## 1. GitHub + Cloudflare Pages 自动部署（推荐路径）

### A. 在 GitHub 创建空仓

打开 <https://github.com/new>：

| 字段 | 值 |
|---|---|
| Owner | `lsy-0721` |
| Repository name | `home` |
| Description | 鱼裕 / YUYU 个人主页 |
| ❌ Initialize with ... | 全部不勾选 |

点 **Create** 后会进入一个空仓页面（已经有 `git@github.com:lsy-0721/home.git` 这样的地址）。

### B. 在 Cloudflare Pages 创建项目 + 接 GitHub

打开：👉 <https://dash.cloudflare.com/64ef1cf2bb3dd86b12041b35ac1d94f6/workers-and-pages>

点 **Create application** → Pages 选项卡 → **Connect to Git**：

| 字段 | 值 |
|---|---|
| **Project name** | `home` （输入框会实时校验是否可用，提示红字就改一下） |
| **Production branch** | `main` |
| **Build settings** | 见下表 |

| 字段 | 值 |
|---|---|
| Framework preset | **Astro**（如果有） |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `dist` |
| Root directory | (留空) |
| Build system version | **V2** |

| 环境变量 | 值 |
|---|---|
| NODE_VERSION | 22 |
| PNPM_VERSION | 9 |

按 **Save and Deploy**。

> Cloudflare 第一次会跳到 GitHub OAuth，授权它访问 `lsy-0721/home`。
> 若之前没授权过，会去：<https://github.com/settings/installations> → Cloudflare Pages → Configure → Repository access → 勾 `lsy-0721/home`。

### C. 把代码推到 GitHub

返回本机 PowerShell：

```powershell
cd D:\yuyu-home
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/lsy-0721/home.git
git push -u origin main
```

> 若开 SSH 就用 `git@github.com:lsy-0721/home.git`。
> 若 401/403：去 GitHub Settings → Developer settings → Personal access tokens → 创建 token，复制粘贴当密码。

### D. 验证构建 + 绑子域

1. 推送后回到 Cloudflare Pages 项目 `home` → 顶部 **View build**，应能看到一次新 build 在跑
2. 等 1–3 分钟构建完成
3. 左侧 **Custom domains** → **Set up a custom domain** → 输入 `home.execute.cc.cd` → Continue → 按提示加 CNAME（或 Cloudflare 自动处理，如果主域也在 Cloudflare）
4. 等 5–15 分钟 DNS 全球生效
5. 访问 <https://home.execute.cc.cd/> 验证

> 之后每次 `git push origin main` 都会自动构建 + 部署。

---

## 2. 手动 / 紧急部署（不走 GitHub）

```powershell
cd D:\yuyu-home
pnpm build

# 路 A — wrangler CLI（需先 pnpm exec wrangler login）
pnpm run deploy

# 路 B — Dashboard 上传 dist：项目页 → uploads → 拖入 dist/
```

---

## 3. 自有服务器（Nginx）

```bash
pnpm build
scp -r dist/* root@<server>:/var/www/home/dist/
sudo cp deploy/nginx.conf.example /etc/nginx/conf.d/home.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d home.execute.cc.cd
```

---

## 4. Docker

```bash
docker build -t home:latest .
docker run --rm -d -p 8080:80 --name home home:latest
```

镜像两阶段构建，约 50MB。

---

## 5. 部署前自查

- [x] `pnpm exec astro check` → 0 errors
- [x] `pnpm build` → 7 pages built（含 404）
- [x] `dist/index.html` 含 `https://www.execute.cc.cd/` 的 Blog 链接
- [x] `.github/workflows/ci.yml` 配置 type-check + build（部署交给 Cloudflare 直连 GitHub）
- [x] `wrangler.toml` 的 project_name 已改为 `home`

---

## 6. 部署后访问

| 路径 | 内容 |
|---|---|
| https://home.execute.cc.cd/         | 首页 6 张卡片 |
| https://home.execute.cc.cd/about    | 关于 + 时间线 |
| https://home.execute.cc.cd/projects | 项目列表 + 状态徽章 |
| https://home.execute.cc.cd/games    | 游戏收藏 + ★ 评分 |
| https://home.execute.cc.cd/music    | 单曲循环 + 4 张歌单 |
| https://home.execute.cc.cd/links    | 网络足迹（含 Blog 真实链接） |

---

## 7. 常见坑

| 现象 | 排查 / 解法 |
|---|---|
| `git push` 401/403 | GitHub → Settings → Developer settings → Personal access tokens → 创建 token，粘贴当密码 |
| 仓名已存在 / Initialize 勾错冲突 | `git pull --rebase origin main` 后再 push；或仓库整删重建 |
| Pages 找不到 GitHub 仓库 | 设置：<https://github.com/settings/installations> → Cloudflare Pages → 勾上仓 |
| 构建日志里 `pnpm` 未找到 | 在 CF Pages 环境变量加 `PNPM_VERSION=9`，或 Build command 改为 `npm i -g pnpm@9 && pnpm install && pnpm build` |
| 构建报 `packages field missing or empty` | pnpm 10+ 改变为强制检查 — 仓库根必须有 `pnpm-workspace.yaml`、并显式写 `packages: ["."]`。另外要避免三个隐形坏字符：(1) **UTF-8 BOM（`EF BB BF`）** — PowerShell 的 `Set-Content` 会加；手工加 BOM 也会；让 pnpm YAML 解析器看不到 `packages:` 这个键；(2) **CRLF 换行** — Windows 编辑器默认写 `0D 0A`；CF 用 Linux 应该只放 `0A`；(3) **注释里出现中文等多字节字符可能被替换为 `?`** — 反正别在 yaml 里写注释，纯 ASCII 最安全。 |
| 构建报 `pnpm-workspace.yaml has an invalid field` | 不要在 `pnpm-workspace.yaml` 里写 `pnpm.onlyBuiltDependencies` 或 `pnpm.overrides` 等 — v10/11 已把这些键搬走，只剩 `packages`、settings（`allowBuilds` 等）。 |
| 构建报 `[ERR_PNPM_IGNORED_BUILDS]`/`Ignored build scripts: workerd` | pnpm 不允许 `workerd` 等跑 postinstall。我们用 `pnpm-workspace.yaml` 里的 `allowBuilds:` 白名单了 `workerd / esbuild / sharp`，无需任何额外配置。 |
| 访问 `/about` 404 | 我们的 build format 是 directory，已生成 `about/index.html`；万一出问题看 Build 设置的 Output dir 是不是 `dist` |
| Blog 卡片 404 | 确认 [src/data/site.ts](src/data/site.ts) 中 Blog URL 仍是 `https://www.execute.cc.cd/` |
| 修改文件不生效 | 静态站点需要重新 `git push` 触发部署；本机 `pnpm dev` 是热更新 |
