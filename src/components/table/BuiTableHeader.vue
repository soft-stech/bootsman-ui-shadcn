<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ref } from 'vue'

const headRef = ref<HTMLElement | null>(null)

defineExpose({ headRef })

const props = defineProps<{
  class?: string
  freezeHeader?: boolean
}>()
</script>

<template>
  <thead
    ref="headRef"
    :class="
      cn(
        props.class,
        props.freezeHeader
          ? 'sticky top-0 z-1 [&_th:first-child>div>div]:pl-3 [&_th:last-child>div>div]:border-r-0 [&_th:last-child>div>div]:pr-14 [&_tr:last-child]:border-b-0'
          : '[&_th:first-child>div]:pl-3 [&_th:last-child>div]:border-0 [&_th:last-child>div]:pr-14',
        '[&>tr]:h-10'
      )
    "
  >
    <slot />
  </thead>
</template>
