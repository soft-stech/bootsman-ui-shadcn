<script setup lang="ts">
import { BuiScrollArea, BuiScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  isFullHeight?: boolean
}>()
</script>

<template>
  <BuiScrollArea
    class="w-full overflow-auto rounded border border-border/[0.16]"
    :class="{ grow: props.isFullHeight }"
  >
    <table :class="cn('w-full caption-top  text-sm', props.class)">
      <slot />
    </table>
    <BuiScrollBar orientation="horizontal" />
  </BuiScrollArea>
</template>
