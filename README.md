# 投资知识学习

> 系统性投资知识学习网站——心法 · 策略 · 技术 · 心理
>
> 纯前端 VitePress 站点，PC + 移动端自适应，内容配合交互式组件学习。

## 内容架构

按模块递进学习：

| 模块 | 章节 | 状态 |
|------|------|------|
| [📖 养家心法](/yangjia/) | 8 章 | ✅ 已上线 |
| [🧠 交易心理](/psychology/) | 7 篇 | ✅ 已上线 |

更多模块陆续添加中……

## 交互组件

所有页面均配有交互式学习组件：

| 组件 | 用途 | 已部署页面 |
|------|------|-----------|
| `InteractiveChecklist` | 可勾选检查清单 + 进度条 + 状态持久化 | 3 页 |
| `AccordionGroup` | 折叠卡片（手风琴） | 2 页 |
| `ScenarioQuiz` | 情景诊断选择题 + 即时对错反馈 | 8 页 |
| `PositionCalculator` | 赢面计算器（滑块调参数→实时算仓位） | 1 页 |
| `TraderTypeTest` | 交易者人格自测 | 1 页 |

## 快速开始

```bash
nvm use          # 确保 Node 20+
npm install      # 安装依赖
npm run dev      # 启动 → http://localhost:3000
npm run build    # 构建静态站点
```

## 技术栈

| 层面 | 选择 |
|------|------|
| 框架 | [VitePress](https://vitepress.dev/) 1.6 |
| 交互 | [Vue 3](https://vuejs.org/) 3.5 (Composition API + `<script setup>`) |
| 内容 | Markdown + YAML frontmatter |
| 配色 | 红金主题 (#dc2626 + #f59e0b) |
| 字体 | Inter + Noto Sans SC |

## 开发参考

完整的设计体系、组件 API、内容规范、后续计划 → **[DEVELOPMENT.md](./DEVELOPMENT.md)**

## 免责声明

本网站内容仅供学习参考，不构成任何投资建议。投资有风险，入市需谨慎。
