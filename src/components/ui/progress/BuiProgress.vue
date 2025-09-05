<script setup lang="ts">
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type HTMLAttributes, computed } from 'vue'

import { progressVariants, indicatorVariants } from '.'

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class']
      variant?: NonNullable<Parameters<typeof progressVariants>[0]>['variant']
      color?: NonNullable<Parameters<typeof indicatorVariants>[0]>['color']
      separators?: NonNullable<Array<number>>
    }
  >(),
  {
    class: '',
    modelValue: 0,
    color: 'primary',
    variant: 'default'
  }
)
const indicatorClass = computed(() => {
  if (!props.modelValue || props.modelValue >= 100) {
    return ''
  }

  return 'rounded-r-none border-r-2'
})
</script>

<template>
  <ProgressRoot
    :class="
      cn(
        'relative w-full overflow-hidden bg-slate-400 bg-opacity-[0.16]',
        progressVariants({ variant }),
        props.class
      )
    "
    v-bind="props"
  >
    <ProgressIndicator
      :class="cn(indicatorVariants({ color, variant }), indicatorClass, props.class)"
      :style="`width: ${props.modelValue ?? 0}%;`"
    />
    <template v-if="props.modelValue && props.separators && props.separators.length > 0">
      <template v-for="separator in props.separators">
        <div
          v-if="separator > 0 && separator < 100 && separator < props.modelValue"
          class="absolute bottom-0 top-0 w-px bg-background p-0!"
          :style="`left:${separator}%`"
        ></div>
      </template>
    </template>
  </ProgressRoot>
</template>
