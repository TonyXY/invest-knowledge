<template>
  <div class="sq-quiz">
    <div v-if="!finished">
      <!-- Progress -->
      <div class="sq-progress-row">
        <div class="sq-progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</div>
        <div class="sq-progress-bar">
          <div class="sq-progress-fill" :style="{ width: ((currentIndex + (answered ? 1 : 0)) / questions.length * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Scenario -->
      <div class="sq-scenario">
        <div class="sq-scenario-label">情景 {{ currentIndex + 1 }}</div>
        <p class="sq-scenario-text">{{ current.scenario }}</p>
      </div>

      <!-- Options -->
      <div class="sq-options">
        <button
          v-for="(opt, i) in current.options"
          :key="i"
          :class="['sq-opt', {
            'sq-opt-selected': selectedIndex === i && !answered,
            'sq-opt-correct': answered && opt.correct,
            'sq-opt-wrong': answered && selectedIndex === i && !opt.correct
          }]"
          :disabled="answered"
          @click="select(i)"
        >
          <span class="sq-opt-tag">{{ tags[i] }}</span>
          <span class="sq-opt-text">{{ opt.text }}</span>
          <span v-if="answered && opt.correct" class="sq-opt-mark sq-mark-correct">✓</span>
          <span v-if="answered && selectedIndex === i && !opt.correct" class="sq-opt-mark sq-mark-wrong">✗</span>
        </button>
      </div>

      <!-- Explanation -->
      <div v-if="answered" class="sq-feedback" :class="selectedCorrect ? 'sq-fb-correct' : 'sq-fb-wrong'">
        <div class="sq-fb-header">{{ selectedCorrect ? '✅ 正确' : '❌ 不对' }}</div>
        <p class="sq-fb-text">{{ current.explanation }}</p>
      </div>

      <!-- Actions -->
      <div class="sq-actions">
        <button
          v-if="!answered && selectedIndex !== null"
          class="sq-btn sq-btn-primary"
          @click="confirm"
        >
          确认答案
        </button>
        <button v-if="answered" class="sq-btn sq-btn-primary" @click="next">
          {{ isLast ? '查看结果' : '下一题 →' }}
        </button>
      </div>
    </div>

    <!-- Result -->
    <div v-else class="sq-result">
      <div class="sq-result-icon">{{ resultEmoji }}</div>
      <div class="sq-result-score">{{ score }} / {{ questions.length }}</div>
      <div class="sq-result-msg">{{ resultMessage }}</div>
      <button class="sq-btn sq-btn-primary" @click="reset">重新测试</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  questions: { type: Array, required: true }
})

const tags = ['A', 'B', 'C', 'D']
const currentIndex = ref(0)
const selectedIndex = ref(null)
const answered = ref(false)
const score = ref(0)
const finished = ref(false)

const current = computed(() => props.questions[currentIndex.value])
const isLast = computed(() => currentIndex.value === props.questions.length - 1)
const selectedCorrect = computed(() =>
  answered.value && current.value.options[selectedIndex.value]?.correct
)

const resultEmoji = computed(() => {
  const ratio = score.value / props.questions.length
  if (ratio >= 0.8) return '🎉'
  if (ratio >= 0.6) return '👍'
  return '💪'
})

const resultMessage = computed(() => {
  const ratio = score.value / props.questions.length
  if (ratio >= 0.8) return '掌握得很好！你对市场阶段识别和策略选择已经有了扎实的理解。'
  if (ratio >= 0.6) return '基础不错，但还有提升空间。建议回顾答错的题目，重点理解对应阶段的市场特征。'
  return '建议重新阅读本章，重点关注「四大市场阶段」的划分和各阶段对应的操作策略。理解清楚后再来测试一次。'
})

function select(i) {
  if (answered.value) return
  selectedIndex.value = i
}

function confirm() {
  if (selectedIndex.value === null) return
  answered.value = true
  if (current.value.options[selectedIndex.value].correct) {
    score.value++
  }
}

function next() {
  if (isLast.value) {
    finished.value = true
  } else {
    currentIndex.value++
    selectedIndex.value = null
    answered.value = false
  }
}

function reset() {
  currentIndex.value = 0
  selectedIndex.value = null
  answered.value = false
  score.value = 0
  finished.value = false
}
</script>

<style scoped>
.sq-quiz {
  margin: 24px 0;
  padding: 0;
}

/* Progress */
.sq-progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.sq-progress-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.sq-progress-bar {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.sq-progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Scenario */
.sq-scenario {
  padding: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 16px;
}

.sq-scenario-label {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.sq-scenario-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin: 0;
}

/* Options */
.sq-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.sq-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  transition: all 0.15s;
}

.sq-opt:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.sq-opt-selected {
  border-color: var(--vp-c-brand-1) !important;
  background: var(--vp-c-brand-soft) !important;
}

.sq-opt-correct {
  border-color: #10b981 !important;
  background: rgba(16, 185, 129, 0.08) !important;
}

.sq-opt-wrong {
  border-color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.08) !important;
}

.sq-opt:disabled {
  cursor: default;
}

.sq-opt-tag {
  width: 26px;
  height: 26px;
  min-width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.sq-opt-selected .sq-opt-tag,
.sq-opt-correct .sq-opt-tag {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.sq-opt-wrong .sq-opt-tag {
  background: #ef4444;
  color: #fff;
}

.sq-opt-text {
  flex: 1;
}

.sq-opt-mark {
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.sq-mark-correct {
  color: #10b981;
}

.sq-mark-wrong {
  color: #ef4444;
}

/* Feedback */
.sq-feedback {
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.6;
}

.sq-fb-correct {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.sq-fb-wrong {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.sq-fb-header {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
}

.sq-fb-text {
  margin: 0;
  color: var(--vp-c-text-1);
}

/* Actions */
.sq-actions {
  display: flex;
  gap: 10px;
}

.sq-btn {
  padding: 10px 28px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.sq-btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.sq-btn-primary:hover {
  background: var(--vp-c-brand-2);
}

/* Result */
.sq-result {
  text-align: center;
  padding: 36px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.sq-result-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.sq-result-score {
  font-size: 36px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
}

.sq-result-msg {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
