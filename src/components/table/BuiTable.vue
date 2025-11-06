<script setup lang="ts">
import { BuiScrollArea, BuiScrollBar } from '@/components/scroll-area'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <BuiScrollArea class="border-border/16 w-full grow overflow-auto rounded-sm border">
    <slot name="columnVisibility" />
    <div class="flex min-h-[90px] grow flex-col">
      <table :class="cn('h-full w-full caption-top text-sm', props.class)">
        <slot />
      </table>
    </div>
    <BuiScrollBar orientation="horizontal" />
  </BuiScrollArea>
</template>
