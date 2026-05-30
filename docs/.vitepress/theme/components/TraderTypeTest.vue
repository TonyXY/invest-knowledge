<template>
  <div class="trader-test">
    <div v-for="(q, qi) in questions" :key="qi" class="test-question">
      <div class="q-header">
        <span class="q-num">第 {{ qi + 1 }} 题</span>
        <span class="q-text">{{ q.text }}</span>
      </div>
      <div class="q-options">
        <button
          v-for="(opt, oi) in q.options"
          :key="oi"
          :class="['opt-btn', { selected: answers[qi] === oi }]"
          @click="select(qi, oi)"
        >
          <span class="opt-tag">{{ tags[oi] }}</span>
          <span class="opt-text">{{ opt }}</span>
        </button>
      </div>
    </div>

    <div v-if="allDone" class="test-actions">
      <button class="result-btn" @click="calcResult">查看我的类型</button>
      <button class="reset-btn" @click="reset">重新测试</button>
    </div>

    <div v-if="resultType" class="result-card" :class="'type-' + resultType.key">
      <div class="result-icon">{{ resultType.icon }}</div>
      <div class="result-title">你的类型：{{ resultType.name }}</div>
      <div class="result-desc">{{ resultType.desc }}</div>
      <div class="result-core">
        <strong>核心问题：</strong>{{ resultType.problem }}
      </div>
      <div class="result-solution">
        <strong>针对性解法：</strong>
        <ol>
          <li v-for="(item, i) in resultType.solution" :key="i">{{ item }}</li>
        </ol>
      </div>
      <button class="reset-btn" @click="reset">重新测试</button>
    </div>

    <div v-if="resultType && resultType.key === 'mixed'" class="mixed-note">
      <p>大多数人都是混合型——在不同市场环境下表现出不同的倾向。建议你先找出当前最致命的一个问题，集中解决它。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tags = ['A', 'B', 'C', 'D']

const questions = [
  {
    text: '你持有的股票浮亏5%了，你通常会怎么做？',
    options: [
      '立刻卖掉，不想亏更多',
      '不止损，觉得它还会涨回来',
      '加仓摊平成本',
      '关掉软件不看，当没这回事'
    ]
  },
  {
    text: '你持有的股票浮盈15%了，你通常会怎么做？',
    options: [
      '赶紧卖掉，落袋为安',
      '继续拿着，觉得还能涨更多',
      '考虑加仓',
      '卖掉一部分，留一部分'
    ]
  },
  {
    text: '你一天看多少次行情？',
    options: [
      '超过20次，忍不住一直刷',
      '开盘收盘各看一次',
      '看行情的时间比做事的时间还多',
      '有挂单就不怎么看'
    ]
  },
  {
    text: '连续亏损三笔之后，你会怎么做？',
    options: [
      '停下来休息，调整状态',
      '加大仓位想一次扳回来',
      '继续按原有策略交易',
      '换一套新方法试试'
    ]
  },
  {
    text: '你觉得你最大的交易问题是什么？',
    options: [
      '不敢下单，错过了很多机会',
      '不止损，小亏变巨亏',
      '管不住手，频繁交易',
      '太固执，认准了就不回头'
    ]
  }
]

const answers = ref([null, null, null, null, null])
const resultType = ref(null)

function select(qi, oi) {
  answers.value[qi] = oi
  resultType.value = null
}

const allDone = computed(() => answers.value.every(a => a !== null))

function countOption(optionIndex) {
  return answers.value.filter(a => a === optionIndex).length
}

function calcResult() {
  const counts = [0, 1, 2, 3].map(i => countOption(i))
  const max = Math.max(...counts)
  const primary = counts.indexOf(max)

  // If mixed (no dominant type), check if it's close
  const sorted = [...counts].sort((a, b) => b - a)
  const isMixed = sorted[0] - sorted[1] <= 1

  if (isMixed) {
    resultType.value = types.mixed
    return
  }

  const typeMap = { 0: 'fear', 1: 'greed', 2: 'impulse', 3: 'stubborn' }
  resultType.value = types[typeMap[primary]]
}

function reset() {
  answers.value = [null, null, null, null, null]
  resultType.value = null
}

const types = {
  fear: {
    key: 'fear',
    icon: '🟢',
    name: '恐惧型',
    desc: '你害怕亏损，所以总是过早止盈、不敢下单、止损特别快——但经常卖在最低点。',
    problem: '你的问题不是风险控制太严，而是风险承受能力太弱。',
    solution: [
      '降低仓位到让你舒服的水平——如果满仓让你睡不着，减到半仓甚至三成仓',
      '用分批建仓代替一把梭——先买三分之一，涨了再加，跌了也不慌',
      '接受"可能会亏"——交易就是概率游戏，没有100%确定的机会'
    ]
  },
  greed: {
    key: 'greed',
    icon: '🔴',
    name: '贪婪型',
    desc: '你不止损、死扛、盈利了也不愿卖——总觉得还能涨更多，结果利润回吐甚至倒亏。',
    problem: '你的问题不是胆量不够，而是没有敬畏市场。',
    solution: [
      '强制挂止损单——买入的同时就挂好，不要依赖你在亏损时的判断力',
      '给自己设仓位上限——任何单只股票不超过总资金的20%',
      '盈利后分批止盈——到目标位先卖一半，留一半继续享受'
    ]
  },
  impulse: {
    key: 'impulse',
    icon: '🟡',
    name: '冲动型',
    desc: '你看到涨就追、看到跌就割、频繁交易——手续费比利润还多。',
    problem: '你的问题不是不够聪明，而是太聪明了——总想抓住每一个机会。',
    solution: [
      '降低交易频率——规定自己每周最多交易X次',
      '每次下单前写交易理由——写不出来不下单，写完第二天再看一遍再决定',
      '把关注点从"赚了多少"转移到"执行了多少次计划"'
    ]
  },
  stubborn: {
    key: 'stubborn',
    icon: '⚫',
    name: '偏执型',
    desc: '你死扛亏损单、跟市场较劲、研究过度——太相信自己的判断。',
    problem: '你的问题不是研究不够深，而是你把自己的判断看得比市场本身的走势更重要。',
    solution: [
      '设置硬性止损，并且止损后拉黑该股票至少一周',
      '买入后必须写下"这笔交易会亏的三个理由"',
      '用概率思维替代判断思维——不是"我看对了/看错了"，而是"这笔交易有60%概率涨"'
    ]
  },
  mixed: {
    key: 'mixed',
    icon: '🌀',
    name: '混合型',
    desc: '你的选项分布比较分散，没有特别明显的倾向。这其实是大多数人的情况。',
    problem: '你在不同市场环境下会表现出不同的问题。',
    solution: []
  }
}
</script>

<style scoped>
.trader-test {
  max-width: 700px;
  margin: 24px 0;
}

.test-question {
  margin-bottom: 28px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.q-header {
  margin-bottom: 14px;
}

.q-num {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  padding: 2px 10px;
  border-radius: 10px;
  margin-bottom: 8px;
}

.q-text {
  display: block;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin-top: 4px;
}

.q-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.opt-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.opt-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.opt-btn.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.opt-tag {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: var(--vp-c-text-2);
}

.opt-btn.selected .opt-tag {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.opt-text {
  flex: 1;
}

.test-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.result-btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.result-btn:hover {
  background: var(--vp-c-brand-2);
}

.reset-btn {
  padding: 12px 24px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.reset-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.result-card {
  margin-top: 24px;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
}

.result-card.type-fear {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.06);
}

.result-card.type-greed {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.06);
}

.result-card.type-impulse {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.06);
}

.result-card.type-stubborn {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.06);
}

.result-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.result-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.result-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
}

.result-core {
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  padding: 10px 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.result-solution {
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.result-solution ol {
  margin: 8px 0 0;
  padding-left: 20px;
}

.result-solution li {
  margin-bottom: 6px;
  line-height: 1.5;
}

.mixed-note {
  margin-top: 16px;
  padding: 14px 18px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.mixed-note p {
  margin: 0;
}
</style>
