<script setup lang="ts">
import { ContextMenuSubTrigger, type ContextMenuSubTriggerProps } from 'reka-ui'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuSubTriggerProps & { class?: string; inset?: boolean }>()
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="props"
    :class="[
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent/8 focus:text-accent-foreground data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent/8',
        inset && 'pl-8',
        props.class
      )
    ]"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
