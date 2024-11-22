<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tr
    :class="
      cn(
        'border-b border-border/[0.08] transition-colors data-[state=selected]:bg-accent/[0.04]',
        props.class
      )
    "
  >
    <slot />
  </tr>
</template>
