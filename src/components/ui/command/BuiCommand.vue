<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue'
import { ComboboxRoot, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxRootProps>()
const emits = defineEmits<ComboboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    :open="true"
    :model-value="''"
    :class="
      cn(
        'shadow-level1 flex h-full w-full flex-col overflow-hidden rounded-md border border-muted bg-popover text-popover-foreground',
        $attrs.class ?? ''
      )
    "
  >
    <slot />
  </ComboboxRoot>
</template>
