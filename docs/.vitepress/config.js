import { defineConfig } from 'vitepress'

const base = '/invest-knowledge/'

export default defineConfig({
  base,
  title: '投资知识学习',
  description: '系统学习投资知识 — 心法·策略·技术·心理',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: '32x32' }],
    ['meta', { name: 'theme-color', content: '#dc2626' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '📖 养家心法', link: '/yangjia/' },
      { text: '🧠 交易心理', link: '/psychology/' },
      { text: '📊 技术分析', link: '/technical/' }
    ],

    sidebar: {
      '/yangjia/': [
        {
          text: '📖 养家心法',
          items: [
            { text: '模块概览', link: '/yangjia/' },
            { text: '01 · 核心心法解读', link: '/yangjia/01-core-philosophy' },
            { text: '02 · 信念的力量', link: '/yangjia/02-belief' },
            { text: '03 · 操作模式解析', link: '/yangjia/03-operation-mode' },
            { text: '04 · 风险管理与市场情绪', link: '/yangjia/04-risk-management' },
            { text: '05 · 市场主流与热点', link: '/yangjia/05-market-mainstream' },
            { text: '06 · 交易心理与买卖时机', link: '/yangjia/06-trading-psychology' },
            { text: '07 · 下跌行情应对', link: '/yangjia/07-downturn-strategy' },
            { text: '08 · 总结与实践指南', link: '/yangjia/08-summary' }
          ]
        }
      ],

      '/psychology/': [
        {
          text: '🧠 交易心理',
          items: [
            { text: '模块概览', link: '/psychology/' },
            { text: '01 · 投资心理培养路径', link: '/psychology/01-cultivate-mentality' },
            { text: '基础篇', items: [
              { text: '02 · 认知偏差与行为金融学', link: '/psychology/02-cognitive-biases' }
            ] },
            { text: '诊断篇', items: [
              { text: '03 · 交易者类型自测', link: '/psychology/03-trader-type-test' },
              { text: '04 · 你的情绪亏钱图谱', link: '/psychology/04-emotional-loss-map' }
            ] },
            { text: '实战篇', items: [
              { text: '05 · 如何克服不停看盘', link: '/psychology/05-stop-peeking' },
              { text: '06 · 止盈止损设置', link: '/psychology/06-stop-profit-loss' },
              { text: '07 · 执行力培养', link: '/psychology/07-execution-discipline' }
            ] }
          ]
        }
      ]
    },

      '/technical/': [
        {
          text: '📊 技术分析基础',
          items: [
            { text: '模块概览', link: '/technical/' },
            { text: '01 · K线基础', link: '/technical/01-candle-basics' },
            { text: '02 · K线组合', link: '/technical/02-candle-patterns' },
            { text: '03 · 量价关系', link: '/technical/03-volume-price' },
            { text: '04 · 趋势判断', link: '/technical/04-trend-analysis' },
            { text: '05 · 支撑与阻力', link: '/technical/05-support-resistance' },
            { text: '06 · 均线系统', link: '/technical/06-moving-averages' },
            { text: '07 · 常见技术形态', link: '/technical/07-chart-patterns' },
            { text: '08 · 核心原则', link: '/technical/08-core-principles' }
          ]
        }
      ],

    outline: [2, 4],

    footer: {
      message: '系统学习投资知识，循序渐进',
      copyright: '仅供学习参考，不构成投资建议'
    }
  }
})
