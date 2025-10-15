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
      cn('border-border/16 bg-card text-card-foreground shadow-card rounded-sm border', props.class)
    "
  >
    <slot />
  </div>
</template>
