<template>
  <div class="ic-checklist">
    <div v-if="title" class="ic-header">
      <h4 class="ic-title">{{ title }}</h4>
      <span v-if="showProgress" class="ic-count">{{ checkedCount }}/{{ items.length }}</span>
    </div>
    <div v-if="showProgress" class="ic-progress-bar">
      <div class="ic-progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
    <div class="ic-items">
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="['ic-item', { 'ic-done': item.checked }]"
        @click="toggle(i)"
      >
        <span class="ic-checkbox">{{ item.checked ? '✓' : '' }}</span>
        <span class="ic-text">{{ item.text }}</span>
      </div>
    </div>
    <button v-if="showReset && checkedCount > 0" class="ic-reset" @click="resetAll">
      重置
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  title: { type: String, default: '' },
  storageKey: { type: String, default: '' },
  showProgress: { type: Boolean, default: true },
  showReset: { type: Boolean, default: true }
})

const items = ref(props.items.map(item => ({
  text: item.text,
  checked: item.checked || false
})))

const checkedCount = computed(() => items.value.filter(i => i.checked).length)
const progressPercent = computed(() =>
  items.value.length ? Math.round((checkedCount.value / items.value.length) * 100) : 0
)

onMounted(() => {
  if (props.storageKey) {
    try {
      const saved = localStorage.getItem(props.storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        items.value = props.items.map((item, i) => ({
          text: item.text,
          checked: parsed[i]?.checked || false
        }))
      }
    } catch (e) {}
  }
})

function toggle(index) {
  items.value[index].checked = !items.value[index].checked
  saveState()
}

function resetAll() {
  items.value.forEach(item => item.checked = false)
  saveState()
}

function saveState() {
  if (props.storageKey) {
    try {
      localStorage.setItem(props.storageKey, JSON.stringify(items.value))
    } catch (e) {}
  }
}
</script>

<style scoped>
.ic-checklist {
  margin: 20px 0;
  padding: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.ic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.ic-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ic-count {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.ic-progress-bar {
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  margin-bottom: 14px;
  overflow: hidden;
}

.ic-progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.ic-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ic-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.ic-item:hover {
  background: var(--vp-c-brand-soft);
}

.ic-item.ic-done {
  opacity: 0.6;
}

.ic-item.ic-done .ic-text {
  text-decoration: line-through;
}

.ic-checkbox {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  transition: all 0.15s;
  margin-top: 1px;
}

.ic-done .ic-checkbox {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.ic-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.ic-reset {
  margin-top: 12px;
  padding: 6px 16px;
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}

.ic-reset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
