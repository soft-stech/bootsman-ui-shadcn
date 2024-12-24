<script setup lang="ts">
import { FORM_READONLY_INJECTION_KEY } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Check, Minus } from 'lucide-vue-next'
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { inject, toRef, useAttrs } from 'vue'

const props = defineProps<CheckboxRootProps>()
const emits = defineEmits<CheckboxRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const checkboxClasses = cva([
  /* base */ 'peer h-4 w-4 shrink-0 rounded-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 transition duration-200',
  /* border */ 'border border-foreground/[0.24] data-[state=checked]:border-primary hover:data-[state=checked]:border-primary-hover data-[state=indeterminate]:border-primary hover:data-[state=indeterminate]:border-primary-hover',
  /* background */ 'hover:bg-foreground/[0.04] data-[state=checked]:bg-primary hover:data-[state=checked]:bg-primary-hover data-[state=indeterminate]:bg-primary hover:data-[state=indeterminate]:bg-primary-hover',
  /* focus */ 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  /* text */ 'text-primary-foreground'
])
const classes = cn(checkboxClasses(), attrs.class as string)

// Inject readonly state from context
const readonlyContext = inject(FORM_READONLY_INJECTION_KEY, toRef(false))
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="classes" :disabled="readonlyContext || props.disabled">
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <Check v-if="checked === true" class="h-4 w-4" />
      <Minus v-if="checked === 'indeterminate'" class="h-4 w-4" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
