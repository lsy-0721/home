// 各页面所需的内容数据集中放在这里
// 想加新条目时直接编辑此文件，不用动模板

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  status: "进行中" | "已完成" | "归档";
  repo?: string;
}

export const projects: Project[] = [
  {
    name: "去哪儿旅游景点大数据分析系统",
    desc: "基于 Hadoop HDFS 与 Hive 的旅游数据仓库，含数据清洗、维度建模与可视化看板，支撑选课与课程设计双重需求。",
    tags: ["Hadoop", "HDFS", "Hive", "数据仓库"],
    status: "已完成",
  },
  {
    name: "Astro Koharu",
    desc: "使用 Astro + React 构建的个人博客前端，对接 Koharu CMS 做内容管理；本次重构的灵感来源。",
    tags: ["Astro", "React", "CMS"],
    status: "进行中",
    repo: "https://github.com/lsy-0721",
  },
  {
    name: "Spark 大数据实验环境",
    desc: "Docker Compose 一键拉起 Spark 3.5.3 集群，用于课程作业与个人分布式计算实验。",
    tags: ["Docker", "Spark", "Scala"],
    status: "已完成",
  },
  {
    name: "鱼裕主页",
    desc: "本站。Astro 5 + 玻璃拟态深空风，逐步完善中。",
    tags: ["Astro", "CSS"],
    status: "进行中",
    repo: "https://github.com/lsy-0721",
  },
];

export interface GameItem {
  name: string;
  role: string;       // 玩到的角色 / 进度
  rating: number;     // 0~5
  cover: string;      // emoji 当封面
  tags: string[];
}

export const games: GameItem[] = [
  {
    name: "崩坏：星穹铁道",
    role: "开拓等级 70 · 主队：希儿 / 银狼 / 布洛妮娅",
    rating: 5,
    cover: "🚂",
    tags: ["米哈游", "RPG", "回合制"],
  },
  {
    name: "原神",
    role: "冒险等阶 60 · 喜欢的角色：芙宁娜、夜兰、八重神子",
    rating: 5,
    cover: "🌌",
    tags: ["米哈游", "开放世界"],
  },
  {
    name: "蔚蓝档案 (Blue Archive)",
    role: "全通主线 · 主推爱丽丝与白洲梓",
    rating: 5,
    cover: "📘",
    tags: ["二次元", "剧情向"],
  },
  {
    name: "CS2",
    role: "休闲玩家 · 大鹰 · 偶尔玩玩 B5/5E",
    rating: 4,
    cover: "🎯",
    tags: ["FPS", "竞技"],
  },
  {
    name: "Minecraft",
    role: "1.21 整合包 · 养老向 · 不挖矿，专注造房子",
    rating: 4,
    cover: "🧱",
    tags: ["沙盒", "联机"],
  },
];

export interface MusicItem {
  title: string;
  artist: string;
  reason: string;
  cover: string;
}

export const nowPlaying: MusicItem[] = [
  { title: "星之所在",       artist: "HOYO-MiX",        reason: "翁瓦兹翻唱版陪我写过无数次作业", cover: "🎧" },
  { title: "If I Can Stop One Heart From Breaking", artist: "Emily Dickinson / 改编", reason: "安静时刻的常驻 BGM", cover: "🌙" },
  { title: "Traveling Light", artist: "Joel Hanson",    reason: "晚上写代码时的低能量节奏", cover: "🛤️" },
];

export const playlists = [
  { name: "深夜写码", count: 87, color: "#7a91ff" },
  { name: "雨夜自习", count: 42, color: "#b59cff" },
  { name: "旅行途中", count: 63, color: "#7ce3c8" },
  { name: "Anime OST", count: 120, color: "#ff9bb6" },
];
