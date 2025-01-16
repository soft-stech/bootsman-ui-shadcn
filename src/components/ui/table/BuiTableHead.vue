<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <th
    :class="
      cn(
        'h-10 bg-foreground/[0.04] text-left align-middle text-base font-semibold text-foreground [&:has([role=checkbox])]:pr-0 ',
        props.class
      )
    "
  >
    <div
      class="flex h-8 items-center whitespace-nowrap border-r border-border/[0.16] px-3 py-1 text-sm"
    >
      <slot />
    </div>
  </th>
</template>
