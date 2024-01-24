<script setup lang="ts">
import { BuiProgress, BuiSlider } from '@/index'

const modelValue = ref([5])

import { ref } from 'vue'
</script>

<template>
  <Story title="BuiProgress" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant title="With slider">
      <div class="m-4">
        <div class="mb-3">Value: {{ modelValue[0] }}</div>
        <div class="flex flex-col gap-2">
          <BuiProgress :model-value="modelValue[0]" class="max-w-[300px]" />
          <BuiSlider v-model="modelValue" :max="100" :step="1" class="max-w-[300px]" />
        </div>
      </div>
    </Variant>

    <Variant title="Progress">
      <div class="m-4 flex flex-col gap-2">
        <div class="m-4 flex flex-col gap-2">
          <BuiProgress :model-value="0" variant="sm" />
          <BuiProgress :model-value="1" variant="sm" />
          <BuiProgress :model-value="50" variant="sm" />
          <BuiProgress :model-value="99" variant="sm" />
          <BuiProgress :model-value="100" variant="sm" />
        </div>

        <div class="m-4 flex flex-col gap-2">
          <BuiProgress :model-value="0" />
          <BuiProgress :model-value="1" />
          <BuiProgress :model-value="50" />
          <BuiProgress :model-value="99" />
          <BuiProgress :model-value="100" />
        </div>

        <div class="m-4 flex flex-col gap-2">
          <BuiProgress :model-value="0" variant="lg" />
          <BuiProgress :model-value="1" variant="lg" />
          <BuiProgress :model-value="50" variant="lg" />
          <BuiProgress :model-value="99" variant="lg" />
          <BuiProgress :model-value="100" variant="lg" />
        </div>
      </div>
    </Variant>

    <Variant title="Colors">
      <div class="m-4 flex flex-col gap-2">
        <BuiProgress :model-value="50" class="max-w-[300px] bg-emerald-500 after:bg-emerald-500" />
        <BuiProgress :model-value="50" class="max-w-[300px] bg-purple-500 after:bg-purple-500" />
        <BuiProgress :model-value="50" class="max-w-[300px] bg-orange-500 after:bg-orange-500" />
      </div>
    </Variant>
  </Story>
</template>
