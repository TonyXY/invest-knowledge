<template>
  <div class="ag-group">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['ag-item', { 'ag-open': openIndex === index }]"
    >
      <button class="ag-trigger" @click="toggle(index)">
        <span class="ag-label">{{ item.title }}</span>
        <span class="ag-arrow">{{ openIndex === index ? '▾' : '▸' }}</span>
      </button>
      <div v-if="item.quote" class="ag-quote">{{ item.quote }}</div>
      <div v-show="openIndex === index" class="ag-body" v-html="item.content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }
})

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.ag-group {
  margin: 20px 0;
}

.ag-item {
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.ag-item.ag-open {
  border-color: var(--vp-c-brand-1);
}

.ag-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  border: none;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-align: left;
  transition: background 0.15s;
  line-height: 1.4;
}

.ag-trigger:hover {
  background: var(--vp-c-brand-soft);
}

.ag-label {
  flex: 1;
}

.ag-arrow {
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: transform 0.2s;
  margin-left: 12px;
  flex-shrink: 0;
}

.ag-quote {
  padding: 0 20px 14px;
  font-style: italic;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
  border-left: 3px solid var(--vp-c-brand-gold, #f59e0b);
  margin: 0 20px 0;
  padding-left: 16px;
}

.ag-body {
  padding: 0 20px 20px;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.ag-body :deep(p) {
  margin: 0 0 12px;
}

.ag-body :deep(p:last-child) {
  margin-bottom: 0;
}

.ag-body :deep(.insight-box) {
  margin-top: 12px;
}

.ag-body :deep(strong) {
  font-weight: 600;
}
</style>
