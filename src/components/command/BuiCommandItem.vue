<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'
import { ComboboxItem, useEmitAsProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxItemProps & { key: string }>()
const emits = defineEmits<ComboboxItemEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <ComboboxItem
    v-bind="{ ...props, ...emitsAsProps }"
    :class="
      cn(
        'data-highlighted:bg-accent/8 data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        $attrs.class ?? ''
      )
    "
    @select.prevent
  >
    <slot />
  </ComboboxItem>
</template>
