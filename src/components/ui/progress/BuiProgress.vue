<script setup lang="ts">
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

import { progressVariants, capVariants, indicatorVariants } from '.'

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class']
      variant?: NonNullable<Parameters<typeof progressVariants>[0]>['variant']
      color?: NonNullable<Parameters<typeof indicatorVariants>[0]>['color']
    }
  >(),
  {
    class: '',
    modelValue: 0,
    color: 'primary',
    variant: 'default'
  }
)
</script>

<template>
  <ProgressRoot
    :class="
      cn(
        'relative w-full overflow-hidden bg-primary bg-opacity-[0.16]',
        progressVariants({ variant }),
        props.class
      )
    "
    v-bind="props"
  >
    <ProgressIndicator
      :class="cn(indicatorVariants({ color, variant }), props.class)"
      :style="`width: calc(calc(100% - ${capVariants[variant ?? 'default']}) * ${
        (props.modelValue ?? 0) * 0.01
      })`"
    />
  </ProgressRoot>
</template>
