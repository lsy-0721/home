// 站点全局配置：导航、身份信息、个人说明等
// 所有页面统一从这里取数据，便于一处更新全站生效
export const site = {
  name: "鱼裕",
  enName: "YUYU",
  tagline: "Data · Web · AI · Otaku",
  bio: "记录代码，也记录生活与喜欢的事。",
  email: "you@example.com",
  // 这里填你自己的社交链接，以后 Links 页自动从这儿取
  socials: [
    { name: "GitHub",  href: "https://github.com/lsy-0721",  tag: "lsy-0721" },
    { name: "米游社",  href: "https://www.miyoushe.com/",     tag: "@yuyu" },
    { name: "Email",   href: "mailto:you@example.com",        tag: "联系我" },
  ] as const,
  // 顶部导航 / 卡片（顺序即展示顺序）
  nav: [
    { title: "Blog",     desc: "记录技术、生活与思考",     href: "https://www.execute.cc.cd/",     icon: "⌁", external: true },
    { title: "Projects", desc: "正在制作与完成的项目",     href: "/projects",                       icon: "◈" },
    { title: "Games",    desc: "游戏收藏与游玩记录",       href: "/games",                          icon: "◇" },
    { title: "Music",    desc: "喜欢的音乐与歌单",         href: "/music",                          icon: "♫" },
    { title: "Links",    desc: "我的网络足迹",             href: "/links",                          icon: "↗" },
  ] as const,
};

export type NavItem = (typeof site.nav)[number];

// 把外链标记渲染成 target="_blank" rel="noreferrer" 的辅助函数
export const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
