<script setup lang="ts">
import { BuiScrollArea, BuiScrollBar } from '@/components/scroll-area'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <BuiScrollArea class="border-border/16 w-full grow overflow-auto rounded border">
    <slot name="columnVisibility" />
    <table :class="cn('min-h-[90px] w-full caption-top text-sm', props.class)">
      <slot />
    </table>
    <BuiScrollBar orientation="horizontal" />
  </BuiScrollArea>
</template>
