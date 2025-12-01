<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'
import { ComboboxContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxContentProps>()
const emits = defineEmits<ComboboxContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxContent
    v-bind="forwarded"
    :class="cn('max-h-[300px] overflow-x-hidden overflow-y-auto', $attrs.class ?? '')"
    @focusOutside.prevent
  >
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>
