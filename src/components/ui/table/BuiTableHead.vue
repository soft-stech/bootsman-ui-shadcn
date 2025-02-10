<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  freezeHeader?: boolean
}>()
</script>

<template>
  <th
    :class="
      cn(
        'h-10 text-left align-middle text-foreground [&:has([role=checkbox])]:pr-0 ',
        props.class,
        props.freezeHeader ? 'bg-background p-0' : 'bg-foreground/[0.04]'
      )
    "
  >
    <div
      v-if="props.freezeHeader"
      class="flex h-full items-center border-b border-border/[0.16] bg-foreground/[0.04]"
    >
      <div
        class="flex h-8 w-full items-center whitespace-nowrap border-r border-border/[0.16] px-3 text-sm font-semibold"
      >
        <slot />
      </div>
    </div>
    <div
      v-else
      class="flex h-8 items-center whitespace-nowrap border-r border-border/[0.16] px-3 py-1 text-sm font-semibold"
    >
      <slot />
    </div>
  </th>
</template>
