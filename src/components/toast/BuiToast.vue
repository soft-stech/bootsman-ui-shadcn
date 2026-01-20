<script lang="ts">
import type { ToastRootEmits, ToastRootProps } from 'reka-ui'
import type { VariantProps } from 'class-variance-authority'

interface ToastVariantProps extends VariantProps<typeof toastVariants> {}

export interface ToastProps extends ToastRootProps {
  class?: string
  variant?: ToastVariantProps['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
  onClose?: () => void
}
</script>

<script setup lang="ts">
import { ToastRoot, useEmitAsProps } from 'reka-ui'

import { toastVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()
</script>

<template>
  <ToastRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    :class="cn(toastVariants({ variant: props.variant }), props.class)"
    @update:open="onOpenChange"
    @close="onClose"
  >
    <slot />
  </ToastRoot>
</template>
