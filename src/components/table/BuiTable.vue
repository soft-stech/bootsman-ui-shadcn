<script setup lang="ts">
import { BuiScrollArea, BuiScrollBar } from '@/components/scroll-area'
import { cn } from '@/lib/utils'
import { ref } from 'vue'

const props = defineProps<{ class?: string }>()
const tableRef = ref<HTMLTableElement | undefined>(undefined)
const scrollAreaElementRef = ref<InstanceType<typeof BuiScrollArea> | null>(null)

defineExpose({ tableRef, scrollAreaElementRef })
</script>

<template>
  <BuiScrollArea
    ref="scrollAreaElementRef"
    class="border-border/16 w-full grow overflow-auto rounded-sm border"
  >
    <slot name="columnVisibility" />
    <div class="flex min-h-[90px] w-full grow flex-col">
      <table ref="tableRef" :class="cn('h-full caption-top text-sm', props.class)">
        <slot />
      </table>
    </div>
    <BuiScrollBar orientation="horizontal" />
  </BuiScrollArea>
</template>
