<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue, ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxRootProps<T>>()
const emits = defineEmits<ComboboxRootEmits<T>>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    :open="true"
    :model-value="''"
    :class="
      cn(
        'border-muted bg-popover text-popover-foreground shadow-level1 flex h-full w-full flex-col overflow-hidden rounded-md border',
        $attrs.class ?? ''
      )
    "
  >
    <slot />
  </ComboboxRoot>
</template>
