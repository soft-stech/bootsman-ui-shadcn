<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <thead
    :class="
      cn(
        '[&_th:first-child>div]:pl-6 [&_th:last-child>div]:border-0 [&_th:last-child>div]:pr-6 [&_tr]:border-b [&_tr]:border-border/[0.16]',
        props.class
      )
    "
  >
    <slot />
  </thead>
</template>
