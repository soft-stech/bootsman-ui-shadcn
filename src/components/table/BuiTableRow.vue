<script setup lang="ts">
import { BuiContextMenu, BuiContextMenuTrigger } from '@/components/context-menu'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
const emits = defineEmits(['mouseenter', 'mouseleave'])
</script>

<template>
  <BuiContextMenu v-if="$slots.actions">
    <BuiContextMenuTrigger as-child>
      <tr
        :class="
          cn(
            'border-border/8 data-[row-state=selected]:bg-accent/8 border-b transition-colors',
            props.class
          )
        "
        :data-row-state="$attrs['data-row-state']"
        @mouseenter="emits('mouseenter')"
        @mouseleave="emits('mouseleave')"
      >
        <slot />
      </tr>
    </BuiContextMenuTrigger>
    <slot name="actions" />
  </BuiContextMenu>
  <tr
    v-else
    :class="
      cn(
        'border-border/8 data-[row-state=selected]:bg-accent/8 border-b transition-colors',
        props.class
      )
    "
    :data-row-state="$attrs['data-row-state']"
    @mouseenter="emits('mouseenter')"
    @mouseleave="emits('mouseleave')"
  >
    <slot />
  </tr>
</template>
