<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  freezeHeader?: boolean
}>()
</script>

<template>
  <thead
    :class="
      cn(
        '[&_tr]:border-border/[0.16]',
        props.class,
        props.freezeHeader
          ? 'sticky top-0 z-[1] [&_th:first-child>div>div]:pl-6 [&_th:last-child>div>div]:border-r-0 [&_th:last-child>div>div]:pr-14 [&_tr:last-child]:border-b-0'
          : '[&_th:first-child>div]:pl-6 [&_th:last-child>div]:border-0 [&_th:last-child>div]:pr-14 [&_tr]:border-b'
      )
    "
  >
    <slot />
  </thead>
</template>
