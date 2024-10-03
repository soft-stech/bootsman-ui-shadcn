<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <th
    :class="
      cn(
        'h-14 bg-foreground/[0.04] text-left align-middle text-base font-semibold text-foreground [&:has([role=checkbox])]:pr-0 ',
        props.class
      )
    "
  >
    <div class="flex h-10 items-center whitespace-nowrap border-r border-border/[0.16] p-4">
      <slot />
    </div>
  </th>
</template>
