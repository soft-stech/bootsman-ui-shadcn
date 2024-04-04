<script setup lang="ts">
import { BuiHealth, BuiSlider } from '@/index'

import { computed, ref } from 'vue'

const h1 = ref([1])
const h2 = ref([3])
const h3 = ref([1])

const health1 = computed(() => {
  return [
    { id: 'Running', class: 'bg-green-500 after:bg-green-500', count: h1.value[0] },
    { id: 'Info', class: 'bg-yellow-500 after:bg-yellow-500', count: h2.value[0] },
    { id: 'Error', class: 'bg-red-500 after:bg-red-500', count: h3.value[0] }
  ]
})
</script>

<template>
  <Story title="BuiHealth" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant title="BuiHealth">
      <div class="m-4">
        <div class="flex flex-col gap-2">
          <BuiHealth :model-value="health1" class="max-w-[300px]" />

          {{ h1 }}
          <BuiSlider v-model="h1" :step="1" :max="50" class="max-w-[300px]" />

          {{ h2 }}
          <BuiSlider v-model="h2" :step="1" :max="50" class="max-w-[300px]" />

          {{ h3 }}
          <BuiSlider v-model="h3" :step="1" :max="50" class="max-w-[300px]" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
