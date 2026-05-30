<template>
  <div class="pc-calculator">
    <!-- Inputs -->
    <div class="pc-inputs">
      <div class="pc-field">
        <label class="pc-label">
          胜率（把握有多大）
          <span class="pc-value">{{ winRate }}%</span>
        </label>
        <input type="range" min="0" max="100" step="5" v-model.number="winRate" class="pc-slider" />
        <div class="pc-slider-labels">
          <span>完全没把握</span>
          <span>非常确定</span>
        </div>
      </div>

      <div class="pc-row">
        <div class="pc-field pc-field-half">
          <label class="pc-label">
            上涨空间
            <span class="pc-value">{{ upside }}%</span>
          </label>
          <input type="range" min="1" max="100" step="1" v-model.number="upside" class="pc-slider" />
        </div>
        <div class="pc-field pc-field-half">
          <label class="pc-label">
            下跌空间
            <span class="pc-value">{{ downside }}%</span>
          </label>
          <input type="range" min="1" max="30" step="1" v-model.number="downside" class="pc-slider" />
        </div>
      </div>
    </div>

    <!-- Calculated Metrics -->
    <div class="pc-metrics">
      <div class="pc-metric">
        <div class="pc-metric-label">赚赔比</div>
        <div class="pc-metric-value" :class="rrClass">{{ rewardRiskRatio }}<span class="pc-unit"> : 1</span></div>
      </div>
      <div class="pc-metric">
        <div class="pc-metric-label">综合赢面</div>
        <div class="pc-metric-value" :class="scoreClass">{{ compositeScore }}%</div>
      </div>
      <div class="pc-metric pc-metric-highlight">
        <div class="pc-metric-label">建议仓位</div>
        <div class="pc-metric-value pc-position" :class="positionClass">{{ positionRange }}</div>
      </div>
    </div>

    <!-- Position Reference Table -->
    <div class="pc-table">
      <div class="pc-table-row pc-table-header">
        <span>综合赢面</span>
        <span>建议仓位</span>
        <span class="pc-status-col">当前</span>
      </div>
      <div
        v-for="row in tableRows"
        :key="row.label"
        :class="['pc-table-row', { 'pc-table-active': row.active }]"
      >
        <span>{{ row.label }}</span>
        <span>{{ row.position }}</span>
        <span class="pc-status-col">{{ row.active ? '◀ 你在这里' : '' }}</span>
      </div>
    </div>

    <!-- Insight -->
    <div v-if="insight" class="pc-insight">
      <div class="pc-insight-icon">💡</div>
      <p>{{ insight }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const winRate = ref(70)
const upside = ref(30)
const downside = ref(5)

const rewardRiskRatio = computed(() => {
  if (downside.value === 0) return 0
  return Math.round((upside.value / downside.value) * 10) / 10
})

const rrClass = computed(() => {
  const r = rewardRiskRatio.value
  if (r >= 6) return 'pc-excellent'
  if (r >= 3) return 'pc-good'
  if (r >= 2) return 'pc-neutral'
  return 'pc-poor'
})

const compositeScore = computed(() => {
  let score = winRate.value
  // Bonus for good risk/reward ratio
  const rr = rewardRiskRatio.value
  if (rr >= 6) score += 12
  else if (rr >= 4) score += 8
  else if (rr >= 2) score += 3
  else if (rr < 1.5) score -= 10
  return Math.min(100, Math.max(0, Math.round(score)))
})

const scoreClass = computed(() => {
  const s = compositeScore.value
  if (s >= 90) return 'pc-excellent'
  if (s >= 70) return 'pc-good'
  if (s >= 60) return 'pc-neutral'
  return 'pc-poor'
})

const positionRange = computed(() => {
  const s = compositeScore.value
  if (s >= 90) return '满仓'
  if (s >= 80) return '50%–70%'
  if (s >= 70) return '30%–50%'
  if (s >= 60) return '10%–20%'
  return '不动手（0%）'
})

const positionClass = computed(() => {
  const s = compositeScore.value
  if (s >= 90) return 'pc-pos-max'
  if (s >= 80) return 'pc-pos-high'
  if (s >= 70) return 'pc-pos-mid'
  if (s >= 60) return 'pc-pos-low'
  return 'pc-pos-none'
})

const tableRows = computed(() => {
  const s = compositeScore.value
  return [
    { label: '90% 以上', position: '满仓', active: s >= 90 },
    { label: '80% – 90%', position: '50% – 70%', active: s >= 80 && s < 90 },
    { label: '70% – 80%', position: '30% – 50%', active: s >= 70 && s < 80 },
    { label: '60% – 70%', position: '10% – 20%', active: s >= 60 && s < 70 },
    { label: '60% 以下', position: '不动手', active: s < 60 }
  ]
})

const insight = computed(() => {
  const s = compositeScore.value
  const rr = rewardRiskRatio.value
  if (s >= 90) return '条件非常好！这是养家说的"满仓出击"级别——把握极大且赔率极其划算。注意：这种机会一年可能不超过10次。'
  if (s >= 80) return '条件很好，值得大仓位参与。前提是你要有足够的把握判断正确，并且严格执行止损。'
  if (s >= 70) return '条件不错，中等仓位参与。建议先买一半，确认方向对了再加仓。'
  if (s >= 60) return '条件一般，小仓位试错为主。不要投入太多，重点在于验证你的判断。'
  if (rr < 1.5 && winRate.value >= 60) return '赚赔比太低了——赚得少亏得多。哪怕把握大也不划算，建议放弃。'
  return '综合条件不够，不要动手。宁可错过，不要做错。'
})
</script>

<style scoped>
.pc-calculator {
  margin: 24px 0;
  padding: 24px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

/* Inputs */
.pc-inputs {
  margin-bottom: 20px;
}

.pc-field {
  margin-bottom: 18px;
}

.pc-field-half {
  flex: 1;
  margin-bottom: 0;
}

.pc-row {
  display: flex;
  gap: 16px;
}

.pc-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.pc-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  min-width: 40px;
  text-align: right;
}

.pc-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  outline: none;
  cursor: pointer;
}

.pc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.pc-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.pc-slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

/* Metrics */
.pc-metrics {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.pc-metric {
  flex: 1;
  text-align: center;
  padding: 14px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
}

.pc-metric-highlight {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.pc-metric-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.pc-metric-value {
  font-size: 22px;
  font-weight: 700;
  transition: color 0.2s;
}

.pc-unit {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.pc-position {
  font-size: 18px;
}

.pc-excellent { color: #10b981; }
.pc-good { color: var(--vp-c-brand-1); }
.pc-neutral { color: #f59e0b; }
.pc-poor { color: #6b7280; }

.pc-pos-max { color: #10b981; font-weight: 800; font-size: 22px; }
.pc-pos-high { color: var(--vp-c-brand-1); }
.pc-pos-mid { color: var(--vp-c-brand-1); }
.pc-pos-low { color: #f59e0b; }
.pc-pos-none { color: #6b7280; }

/* Table */
.pc-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
}

.pc-table-row {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
}

.pc-table-row:last-child {
  border-bottom: none;
}

.pc-table-row span {
  flex: 1;
}

.pc-table-header {
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
}

.pc-status-col {
  text-align: right;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  min-width: 100px;
}

.pc-table-active {
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

/* Insight */
.pc-insight {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.pc-insight-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.pc-insight p {
  margin: 0;
}
</style>
