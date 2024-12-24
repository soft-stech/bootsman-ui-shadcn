<script setup lang="ts">
import { FORM_READONLY_INJECTION_KEY } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import {
  RadioGroupRoot,
  type RadioGroupRootEmits,
  type RadioGroupRootProps,
  useForwardPropsEmits
} from 'radix-vue'
import { inject, toRef } from 'vue'

const props = defineProps<RadioGroupRootProps & { class?: string }>()
const emits = defineEmits<RadioGroupRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// Inject readonly state from context
const readonlyContext = inject(FORM_READONLY_INJECTION_KEY, toRef(false))
</script>

<template>
  <RadioGroupRoot
    :class="cn('grid gap-2', props.class)"
    v-bind="forwarded"
    :disabled="readonlyContext || props.disabled"
  >
    <slot />
  </RadioGroupRoot>
</template>
