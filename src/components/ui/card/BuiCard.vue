<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    :class="
      cn(
        'shadow-card-shadow rounded border border-border/[0.16] bg-card text-card-foreground',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
