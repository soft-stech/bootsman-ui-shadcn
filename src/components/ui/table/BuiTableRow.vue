<script setup lang="ts">
import { BuiContextMenu, BuiContextMenuTrigger } from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <BuiContextMenu v-if="$slots.actions">
    <BuiContextMenuTrigger as-child>
      <tr
        :class="
          cn(
            'border-b border-border/8 transition-colors data-[row-state=selected]:bg-accent/4',
            props.class
          )
        "
        :data-row-state="$attrs['data-row-state']"
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
        'border-b border-border/8 transition-colors data-[row-state=selected]:bg-accent/4',
        props.class
      )
    "
    :data-row-state="$attrs['data-row-state']"
  >
    <slot />
  </tr>
</template>
