<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <thead
    :class="
      cn(
        '[&_th:first-child_div]:pl-8 [&_th:last-child_div]:border-0 [&_th:last-child_div]:pr-8 [&_tr]:border-b [&_tr]:border-border/[0.16]',
        props.class
      )
    "
  >
    <slot />
  </thead>
</template>
