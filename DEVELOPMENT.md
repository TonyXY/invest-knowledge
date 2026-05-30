# 投资知识学习 — 开发文档

## 目录

1. [项目概览](#1-项目概览)
2. [技术栈](#2-技术栈)
3. [目录结构](#3-目录结构)
4. [CSS 设计系统](#4-css-设计系统)
5. [交互组件库](#5-交互组件库)
6. [内容创作指南](#6-内容创作指南)
7. [内容通俗度标准](#7-内容通俗度标准)
8. [构建与部署](#8-构建与部署)
9. [后续计划](#9-后续计划)

---

## 1. 项目概览

纯前端投资知识学习网站，PC + 移动端自适应。内容以模块为单位递进，每个模块聚焦一个主题。

### 核心原则

- **通俗易懂**：不用专业术语（用了必须解释），一篇只讲一个概念，必须有"手把手"的具体步骤
- **交互式学习**：内容配合可点击的交互组件（选择题、检查清单、计算器），不能只是静态文字
- **实战视角**：以投资经理角度，内容要有实战洞察

### 当前模块

| 模块 | 文章数 | 状态 |
|------|--------|------|
| 📖 养家心法 | 8 章 | ✅ 已上线 |
| 🧠 交易心理 | 7 篇 | ✅ 已上线 |

---

## 2. 技术栈

| 层面 | 选择 | 版本 |
|------|------|------|
| 静态站点框架 | [VitePress](https://vitepress.dev/) | ^1.6.4 |
| UI 框架 | [Vue](https://vuejs.org/) | ^3.5.34 |
| 内容格式 | Markdown + YAML frontmatter | — |
| 字体 | Inter + Noto Sans SC | — |
| 包管理 | npm | — |
| Node 版本 | 20+ | 见 `.nvmrc` |

### 已内置可用依赖（无需额外安装）

通过 VitePress 间接可用：

- `@vueuse/core` — VueUse composables（`useStorage`, `useWindowSize` 等）
- `@vueuse/integrations` — VueUse 集成模块

### 无额外依赖

项目没有引入 UI 组件库、状态管理、路由库。VitePress 处理路由，Vue 处理交互。

---

## 3. 目录结构

```
invest-knowledge/
├── docs/
│   ├── .vitepress/
│   │   ├── config.js              # 站点配置（导航、侧边栏、主题色）
│   │   └── theme/
│   │       ├── index.js            # 主题入口——注册全局组件
│   │       ├── custom.css          # 自定义样式 + CSS 变量
│   │       └── components/         # 交互组件（.vue）
│   │           ├── TraderTypeTest.vue
│   │           ├── InteractiveChecklist.vue
│   │           ├── AccordionGroup.vue
│   │           ├── ScenarioQuiz.vue
│   │           └── PositionCalculator.vue
│   ├── public/
│   │   ├── hero.svg                # 首页 Hero 图（K 线风格）
│   │   ├── logo.svg                # 站点 logo（"投"字）
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── index.md                    # 首页
│   ├── yangjia/                    # 📖 养家心法模块
│   │   ├── index.md
│   │   ├── 01-core-philosophy.md
│   │   ├── 02-belief.md
│   │   ├── 03-operation-mode.md
│   │   ├── 04-risk-management.md
│   │   ├── 05-market-mainstream.md
│   │   ├── 06-trading-psychology.md
│   │   ├── 07-downturn-strategy.md
│   │   └── 08-summary.md
│   └── psychology/                # 🧠 交易心理模块
│       ├── index.md
│       ├── 01-cultivate-mentality.md
│       ├── 02-cognitive-biases.md
│       ├── 03-trader-type-test.md
│       ├── 04-emotional-loss-map.md
│       ├── 05-stop-peeking.md
│       ├── 06-stop-profit-loss.md
│       └── 07-execution-discipline.md
├── package.json
├── .nvmrc
├── .gitignore
├── README.md                      # 项目首页
└── DEVELOPMENT.md                 # 本文件
```

### 文件命名规范

- 内容文件：`XX-short-description.md`（前缀两位数字，连词符分隔）
- 模块首页：模块目录下的 `index.md`
- 组件文件：`PascalCase.vue`
- 静态资源：小写字母，连词符分隔

---

## 4. CSS 设计系统

### 品牌色

定义在 `docs/.vitepress/theme/custom.css` 的 `:root` 中：

| CSS 变量 | 值 | 用途 |
|----------|-----|------|
| `--vp-c-brand-1` | `#dc2626` | 主色：链接、按钮、边框 |
| `--vp-c-brand-2` | `#b91c1c` | 主色 hover 态 |
| `--vp-c-brand-3` | `#991b1b` | 主色 active 态 |
| `--vp-c-brand-soft` | `rgba(220,38,38,0.14)` | 主色柔背景 |
| `--vp-c-brand-gold` | `#f59e0b` | 金色强调：原文引用、二级强调 |
| `--vp-c-brand-gold-soft` | `rgba(245,158,11,0.14)` | 金色柔背景 |

### 语义色（VitePress 内置可用）

- `--vp-c-text-1` / `-2` / `-3` — 文本色阶
- `--vp-c-bg` / `-alt` / `-elv` / `-soft` — 背景色阶
- `--vp-c-divider` — 分割线
- `--vp-c-green-*`, `--vp-c-yellow-*`, `--vp-c-red-*` — 语义色阶
- `--vp-shadow-1` ~ `--vp-shadow-5` — 阴影

### 圆角规范

| 场景 | 圆角 |
|------|------|
| 卡片/大容器 | `12px` |
| 按钮/内嵌框 | `8px` |
| 标签/徽章 | `10px` |
| 圆形头标 | `50%` |

### 全局 CSS 工具类

定义在 `custom.css`，可在任何 markdown 文件中直接使用：

| 类名 | 说明 |
|------|------|
| `.card-grid` | CSS Grid 卡片容器，`auto-fill, minmax(280px,1fr)` |
| `.card` | 卡片样式，hover 有上浮+阴影效果 |
| `.learning-path` | 分步学习路径，竖排步骤列表 |
| `.step-num` | 步骤数字圆标 |
| `.step-info` | 步骤文字信息 |
| `blockquote.original-text` | 金色左边框，原文引用块 |
| `.insight-box` | 红色边框，投资经理解读块 |
| `.principle-list` | 自动编号列表 |

### 新增组件样式规范

- 使用 `<style scoped>` 避免样式泄露
- 引用 `var(--vp-c-*)` 变量保持主题一致性
- 组件最外层容器统一使用 `margin: 24px 0` 保持段落间距
- 不建议引入外部 CSS 库或 Tailwind，保持零额外 CSS 依赖

---

## 5. 交互组件库

所有组件通过 `docs/.vitepress/theme/index.js` 全局注册，在 markdown 中直接用标签名使用（需包裹 `<ClientOnly>`）。

### 5.1 InteractiveChecklist

交互式检查清单，支持勾选/取消、进度条、状态持久化。

**Props:**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `items` | `Array<{text: string}>` | 是 | — | 清单条目数组 |
| `title` | `string` | 否 | `''` | 清单标题 |
| `storageKey` | `string` | 否 | `''` | localStorage 存储键名（设置后刷新保留状态） |
| `showProgress` | `boolean` | 否 | `true` | 是否显示进度条 |
| `showReset` | `boolean` | 否 | `true` | 是否显示重置按钮 |

**使用示例：**

```markdown
<ClientOnly>
  <InteractiveChecklist
    title="买入前检查"
    :items="[
      { text: '买入逻辑清晰吗？' },
      { text: '止损位设好了吗？' }
    ]"
    storage-key="invest-checklist-buy"
  />
</ClientOnly>
```

### 5.2 AccordionGroup

折叠卡片组（手风琴模式——同时只能展开一张）。

**Props:**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `items` | `Array<{title, quote?, content}>` | 是 | — | 卡片数据 |

**item 数据结构：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 是 | 卡片标题（始终可见） |
| `quote` | `string` | 否 | 引文（标题下方，始终可见） |
| `content` | `string` | 是 | 展开后显示的内容（HTML 格式） |

**注意：** `content` 需要传入 **HTML 字符串**（不是 Markdown），因为组件内部使用 `v-html` 渲染。Markdown 语法如 `**bold**` 不会生效，请使用 `<strong>bold</strong>`。

**使用示例：**

```markdown
<script setup>
const principles = [
  {
    title: '第一句：情绪揣摩',
    quote: '原文引用文字...',
    content: '<p>解读内容...</p><div class="insight-box">...</div>'
  }
]
</script>

<ClientOnly>
  <AccordionGroup :items="principles" />
</ClientOnly>
```

**数据定义位置：** 推荐在 markdown 文件中用 `<script setup>` 块定义数据数组，不要写在模板属性中（避免转义问题）。

### 5.3 ScenarioQuiz

情景诊断选择题。给出一段市场场景描述，用户选择最佳应对方案，选择后显示对/错反馈和解析。

**Props:**

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `questions` | `Array<Question>` | 是 | 题目数组 |

**Question 数据结构：**

```typescript
{
  scenario: string,          // 情景描述
  options: Array<{           // 选项
    text: string,
    correct: boolean
  }>,
  explanation: string        // 解析文字（无论对错都显示）
}
```

**标准：** 每题 4 个选项，**有且仅有一个** `correct: true`。

**使用示例：**

```markdown
<ClientOnly>
  <ScenarioQuiz :questions="quizQuestions" />
</ClientOnly>

<script setup>
const quizQuestions = [
  {
    scenario: '情景描述文字...',
    options: [
      { text: '错误选项A', correct: false },
      { text: '正确选项B', correct: true },
      { text: '错误选项C', correct: false },
      { text: '错误选项D', correct: false }
    ],
    explanation: '解析文字...'
  }
]
</script>
```

### 5.4 PositionCalculator

赢面计算器。滑块调整胜率和涨跌幅空间，实时计算赚赔比、综合赢面和建议仓位。

**Props：** 无（所有数据在组件内部管理）

**使用示例：**

```markdown
<ClientOnly>
  <PositionCalculator />
</ClientOnly>
```

**计算逻辑：**
- 综合赢分 = 胜率 + 赚赔比调整（赚赔比 >= 6 加 12 分，>= 4 加 8 分，>= 2 加 3 分，< 1.5 减 10 分）
- 仓位映射：>= 90 → 满仓 / >= 80 → 50-70% / >= 70 → 30-50% / >= 60 → 10-20% / < 60 → 不动手

### 5.5 TraderTypeTest

交易者类型自测。5 道选择题，根据选项分布判断用户属于恐惧型/贪婪型/冲动型/偏执型/混合型。

**Props：** 无（所有数据在组件内部管理）

**使用示例：**

```markdown
<ClientOnly>
  <TraderTypeTest />
</ClientOnly>
```

### 组件使用注意事项

1. **必须包裹 `<ClientOnly>`** — 所有 Vue 组件都需要在 markdown 中用 `<ClientOnly>` 包裹，确保 SSR 兼容性
2. **数据定义在 `<script setup>`** — 对于数据量大的组件，把数据定义在 `script setup` 中，比写在模板属性中更清晰，也避免引号转义问题
3. **不要在 markdown 的 Vue 组件中使用 markdown 语法** — 组件的 slot 或 `v-html` 不会解析 markdown，用纯 HTML
4. **storageKey 命名约定** — `invest-checklist-{module}-{section}`，避免冲突

---

## 6. 内容创作指南

### 6.1 新建页面

1. 在对应模块目录创建 `XX-topic-name.md`
2. 添加 YAML frontmatter：
   ```yaml
   ---
   title: 页面标题
   description: 页面描述（用于 SEO 和社交分享）
   ---
   ```
3. 更新 `docs/.vitepress/config.js` 中的侧边栏配置
4. 更新模块的 `index.md` 添加导航卡片

### 6.2 添加交互组件到已有页面

1. 在 `docs/.vitepress/theme/index.js` 中注册组件（如未注册）
2. 在 markdown 文件中用 `<ClientOnly><组件名 /></ClientOnly>` 引入
3. 如果组件需要数据，用 `<script setup>` 定义数据

### 6.3 情景题设计规范（ScenarioQuiz）

设计情景题时遵循以下原则：

1. **场景要具体** — "你今天开盘追了一个龙头股，买入后板块走弱" ✅ vs "市场不好时怎么办" ❌
2. **选项要有区分度** — 四个选项代表四种不同思路，不能有两个明显错误的选项
3. **正确选项要有理有据** — 基于对应文章中的核心知识点
4. **解析要解释为什么对/错** — 不只是说"这个不对"，要解释背后的逻辑
5. **每题 4 个选项，唯一正确答案**

### 6.4 交互组件选择决策树

```
内容中有明确的对错判断？ → ScenarioQuiz
内容中有步骤/待办事项？ → InteractiveChecklist
内容中有多项并列结构？ → AccordionGroup
内容中有数字计算？ → PositionCalculator
内容是人格/类型诊断？ → TraderTypeTest
```

---

## 7. 内容通俗度标准

所有内容必须遵守以下规则（源自早期审查发现的问题）：

1. **不出现未经解释的专业术语**
   - ❌ "左侧交易右侧交易" → ✅ "左侧交易（猜底提前买）和右侧交易（等确认再买）"
   - ❌ "风报比" → ✅ "赚赔比（赚多少 vs 亏多少）"

2. **不出现数学符号/公式**
   - ❌ "E = P × R" → ✅ 用文字表格描述
   - 必须用数学时，用大白话 + 例子替代公式

3. **不出现学术引用**
   - ❌ "根据 Kahneman 和 Tversky 的前景理论..." → ✅ "科学实验发现..."
   - 去掉所有脚注、参考文献

4. **每篇只讲一个核心概念**
   - 如果一个页面需要理解另一个概念才能读懂，先链接到对应页面

5. **必须有具体步骤**
   - 不只是"要做好止损"，而是"第一步：买入时挂好止损单。第二步：到了止损位不要犹豫。第三步：..."

---

## 8. 构建与部署

### 本地开发

```bash
nvm use          # 切换 Node 20+
npm install      # 安装依赖
npm run dev      # 启动开发服务器 → http://localhost:3000
npm run build    # 构建静态站点 → docs/.vitepress/dist/
npm run preview  # 预览构建结果
```

### 构建验证

提交前务必运行：

```bash
npm run build
```

确保构建无报错。常见问题：

- **引号转义错误**：`\"` 在 Vue 模板属性中会被 HTML 解析器混淆。把数据移到 `<script setup>` 中定义
- **组件未注册**：新建了 `.vue` 文件但没有在 `theme/index.js` 中 `import` 和 `app.component()`
- **SSR 兼容性**：使用 `localStorage`、`window` 等浏览器 API 需在 `onMounted` 中访问，或使用 `<ClientOnly>` 包裹

### 部署

项目配置了 GitHub Actions（`.github/workflows/deploy.yml`），推送到 `main` 分支自动部署到 GitHub Pages。

```bash
git push origin main
```

---

## 9. 后续计划

### P0（高优先级）

| 项目 | 说明 | 预估工作量 |
|------|------|-----------|
| **技术分析基础模块** | K 线、量价关系、趋势、支撑阻力、形态识别。每篇 1 个概念 + 交互练习 | 8-10 篇 |
| **交易系统构建模块** | 选股→买点→卖点→仓位→复盘，完整闭环 | 6-8 篇 |

### P1（中优先级）

| 项目 | 说明 |
|------|------|
| **资金管理进阶** | 凯利公式改良、多品种组合、杠杆使用 |
| **A 股市场认知** | 交易制度、投资者结构、历史规律、政策解读 |

### P2（低优先级）

| 项目 | 说明 |
|------|------|
| **经典投资流派** | 价值投资、趋势交易、量化交易、事件驱动 |
| **实战案例库** | 真实的交易案例逐笔复盘 |

### 新组件需求

| 组件 | 用途 | 优先级 |
|------|------|--------|
| 情绪日志表单 | `psychology/04-emotional-loss-map.md` 的记录模板交互化 | P1 |
| 对比滑块 | 两种策略/方法的前后对比 | P2 |
| 回测模拟器 | 简单策略的历史表现模拟 | P2 |

### 代码优化

- [ ] 检查是否存在 AI 代码异味（用 `find-skills` 技能 / `ai-slop-remover` 命令）
- [ ] 考虑 Auto Import 模式注册组件（替代手动 import/export）
