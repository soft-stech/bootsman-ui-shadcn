<script setup lang="ts">
import { BuiProgress } from '@/components/ui/progress'

const progress = ref(13)

import { ref, watchEffect } from 'vue'

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => (progress.value = 90), 1000)
  cleanupFn(() => clearTimeout(timer))
})
</script>

<template>
  <Story title="BuiProgress" autoPropsDisabled :layout="{ type: 'grid', width: '20%' }">
    <Variant title="5">
      <BuiProgress :model-value="5" />
    </Variant>

    <Variant :title="25">
      <BuiProgress :model-value="25" />
    </Variant>

    <Variant :title="75">
      <BuiProgress :model-value="75" />
    </Variant>

    <Variant :title="100">
      <BuiProgress :model-value="100" />
    </Variant>

    <Variant title="From 13 to 90">
      <BuiProgress v-model="progress" />
    </Variant>
  </Story>
</template>
