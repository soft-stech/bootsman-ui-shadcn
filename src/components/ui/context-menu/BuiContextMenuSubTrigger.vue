<script setup lang="ts">
import { ContextMenuSubTrigger, type ContextMenuSubTriggerProps } from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuSubTriggerProps & { class?: string; inset?: boolean }>()
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="props"
    :class="[
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent/[0.08] focus:text-accent-foreground data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent/[0.08]',
        inset && 'pl-8',
        props.class
      )
    ]"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
