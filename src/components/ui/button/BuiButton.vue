<script setup lang="ts">
import { FORM_READONLY_INJECTION_KEY } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { inject, toRef, type HTMLAttributes } from 'vue'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
  type?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  as: 'button',
  type: 'button'
})

// Inject readonly state from context
const readonlyContext = inject(FORM_READONLY_INJECTION_KEY, toRef(false))
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :type="type"
    :disabled="readonlyContext || props.disabled"
  >
    <slot />
  </Primitive>
</template>
