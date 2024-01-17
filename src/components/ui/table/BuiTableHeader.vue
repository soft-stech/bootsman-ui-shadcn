<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <thead
    :class="
      cn('[&_th:last-child_div]:border-0 [&_tr]:border-b [&_tr]:border-border/[0.16]', props.class)
    "
  >
    <slot />
  </thead>
</template>
