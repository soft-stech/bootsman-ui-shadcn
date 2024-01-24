<script setup lang="ts">
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

import { progressVariants, capVariants } from '.'

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class']
      variant?: NonNullable<Parameters<typeof progressVariants>[0]>['variant']
    }
  >(),
  {
    class: '',
    modelValue: 0
  }
)
</script>

<template>
  <ProgressRoot
    :class="
      cn(
        `relative w-full overflow-hidden bg-primary bg-opacity-20 after:absolute after:right-0 after:top-0 after:bg-primary after:bg-opacity-10`,
        progressVariants({ variant }),
        props.class
      )
    "
    v-bind="props"
  >
    <ProgressIndicator
      :class="
        cn(
          'absolute box-content flex-1 bg-primary bg-opacity-60 transition-all duration-300 after:absolute after:right-0 after:top-0 after:bg-primary',
          progressVariants({ variant }),

          props.class
        )
      "
      :style="`width: calc(calc(100% - ${capVariants[variant ?? 'default']}) * ${
        (props.modelValue ?? 0) * 0.01
      })`"
    />
  </ProgressRoot>
</template>
