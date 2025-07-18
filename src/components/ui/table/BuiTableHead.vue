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
        'relative h-10 text-left align-middle text-foreground [&:has([role=checkbox])]:pr-0 ',
        props.class,
        props.freezeHeader ? 'bg-background p-0' : 'bg-foreground/[0.04] p-0'
      )
    "
  >
    <div
      class="flex h-full items-center !border-b !border-border/[0.16]"
      :class="{
        'bg-foreground/[0.04]': props.freezeHeader,
        'header-cell_wrapper': !props.freezeHeader
      }"
    >
      <div
        class="flex h-full w-full items-center whitespace-nowrap border-r border-border/[0.16] px-2 text-sm font-semibold"
        :class="{ 'header-cell_wrapper': props.freezeHeader }"
      >
        <slot />
      </div>
    </div>
  </th>
</template>
