<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type PrimitiveProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

import { capHealthVariants, healthVariants } from '.'

export interface HealthRootProps extends PrimitiveProps {
  modelValue?: { id: string; class: HTMLAttributes['class']; count: number }[]
}

const props = withDefaults(
  defineProps<
    HealthRootProps & {
      class?: HTMLAttributes['class']
      variant?: NonNullable<Parameters<typeof healthVariants>[0]>['variant']
    }
  >(),
  {
    class: '',
    modelValue: () => []
  }
)

const total = computed(() => {
  return props.modelValue.reduce((acc, item) => acc + item.count, 0)
})

const indicators = computed(() => {
  let left = 0
  return props.modelValue
    .map((indicator) => {
      const value = (indicator.count / total.value) * 100

      const newIndicator = {
        ...indicator,
        left: left,
        value
      }

      left += value

      return newIndicator
    })
    .filter((indicator) => indicator.count > 0)
})
</script>

<template>
  <div
    :class="
      cn(
        `relative w-full overflow-hidden after:absolute after:top-0 after:right-0`,
        healthVariants({ variant }),
        indicators.length === 0 && 'border-input border',
        props.class
      )
    "
    v-bind="props"
  >
    <template v-for="indicator in indicators" :key="indicator.id">
      <div
        :class="
          cn(
            'absolute box-content flex-1 transition-all duration-300 after:absolute after:top-0 after:right-0',
            healthVariants({ variant }),
            indicator.class
          )
        "
        :style="`width: calc(calc(100% - ${capHealthVariants[variant ?? 'default']}) * ${
          indicator.value * 0.01
        }); left: calc(calc(100% - ${capHealthVariants[variant ?? 'default']}) * ${
          indicator.left * 0.01
        });`"
      />
    </template>
  </div>
</template>
