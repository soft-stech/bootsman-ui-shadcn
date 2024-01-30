<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tfoot
    :class="
      cn(
        'border-t border-border/[0.16] bg-primary/[0.04] text-base text-muted-foreground',
        props.class
      )
    "
  >
    <slot />
  </tfoot>
</template>
