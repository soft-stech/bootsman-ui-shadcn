<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { FORM_READONLY_INJECTION_KEY } from '@/components/form'
import type { AcceptableValue, SelectRootEmits, SelectRootProps } from 'reka-ui'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { inject, toRef } from 'vue'

const props = defineProps<SelectRootProps<T>>()
const emits = defineEmits<SelectRootEmits<T>>()

const forwarded = useForwardPropsEmits(props, emits)

// Inject readonly state from context
const readonlyContext = inject(FORM_READONLY_INJECTION_KEY, toRef(false))
</script>

<template>
  <SelectRoot v-bind="forwarded" :disabled="readonlyContext || props.disabled">
    <slot />
  </SelectRoot>
</template>
