<script setup lang="ts" generic="TData, TValue">
import { BuiContextMenu, BuiContextMenuTrigger } from '@/components/context-menu'
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
        'text-foreground relative h-14 text-left align-middle [&:has([role=checkbox])]:pr-0',
        props.class,
        props.freezeHeader
          ? 'bg-background p-0'
          : 'bg-foreground/4 hover:bg-foreground/8 dark:hover:bg-accent/16 p-0'
      )
    "
  >
    <BuiContextMenu v-if="$slots.actions">
      <BuiContextMenuTrigger as-child>
        <div
          class="border-border/16! flex h-full items-center border-b!"
          :class="{
            'bg-foreground/4 hover:bg-foreground/8 dark:hover:bg-accent/16': props.freezeHeader,
            'header-cell_wrapper': !props.freezeHeader
          }"
        >
          <div
            class="border-border/16 flex h-full w-full items-center border-r px-2 text-sm font-semibold whitespace-nowrap"
            :class="{ 'header-cell_wrapper': props.freezeHeader }"
          >
            <slot />
          </div>
        </div>
      </BuiContextMenuTrigger>
      <slot name="actions" />
    </BuiContextMenu>
    <div
      v-else
      class="border-border/16! flex h-full items-center border-b!"
      :class="{
        'bg-foreground/4 hover:bg-foreground/8 dark:hover:bg-accent/16': props.freezeHeader,
        'header-cell_wrapper': !props.freezeHeader
      }"
    >
      <div
        class="border-border/16 flex h-full w-full items-center border-r px-2 text-sm font-semibold whitespace-nowrap"
        :class="{ 'header-cell_wrapper': props.freezeHeader }"
      >
        <slot />
      </div>
    </div>
  </th>
</template>
