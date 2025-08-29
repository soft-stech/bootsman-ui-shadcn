<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
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
        'flex h-full w-full flex-col overflow-hidden rounded-md border border-muted bg-popover text-popover-foreground shadow-level1',
        $attrs.class ?? ''
      )
    "
  >
    <slot />
  </ComboboxRoot>
</template>
