<script setup lang="ts">
import { FORM_READONLY_INJECTION_KEY } from '@/components/ui/form'
import type { SelectRootEmits, SelectRootProps } from 'radix-vue'
import { SelectRoot, useForwardPropsEmits } from 'radix-vue'
import { inject, toRef } from 'vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// Inject readonly state from context
const readonlyContext = inject(FORM_READONLY_INJECTION_KEY, toRef(false))
</script>

<template>
  <SelectRoot v-bind="forwarded" :disabled="readonlyContext || props.disabled">
    <slot />
  </SelectRoot>
</template>
