<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tr
    :class="
      cn(
        'border-b border-border/[0.08] transition-colors data-[state=selected]:bg-muted' /* hover:bg-muted/50 */,
        props.class
      )
    "
  >
    <slot />
  </tr>
</template>
