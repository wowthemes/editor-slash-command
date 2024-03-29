<!-- CommandList.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Item } from '../utils/types';

const props = defineProps<{
  items: Item[];
  command: (item: Item) => void;
}>();
const selectedIndex = ref(0)

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

const upHandler = () => {
  selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length
}

const downHandler = () => {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
}

const enterHandler = () => {
  selectItem(selectedIndex.value)
}

const selectItem = (index: number) => {
  const item = props.items[index]
  if (item) {
    props.command(item)
  }
}

watch(() => props.items, () => {
  selectedIndex.value = 0
})

defineExpose({ onKeyDown })
</script>

<template>
  <div class="items">
    <template v-if="items.length">
      <button class="item" :class="{ 'is-selected': index === selectedIndex }" v-for="(item, index) in items" :key="index"
        @click="selectItem(index)">
        {{ item.title }}
      </button>
    </template>
    <div class="item" v-else>
      No result
    </div>
  </div>
</template>

<style lang="scss">
.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #FFF;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0px 10px 20px rgba(0, 0, 0, 0.1),
  ;
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    border-color: #000;
  }
}
</style>