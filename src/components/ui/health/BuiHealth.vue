<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type PrimitiveProps } from 'radix-vue'
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
        `relative w-full overflow-hidden bg-slate-400 bg-opacity-20 after:absolute after:right-0 after:top-0 after:bg-slate-400 after:bg-opacity-10`,
        healthVariants({ variant }),
        props.class
      )
    "
    v-bind="props"
  >
    <template v-for="indicator in indicators" :key="indicator.id">
      <div
        :class="
          cn(
            'absolute box-content flex-1 bg-slate-400 transition-all duration-300 after:absolute after:right-0 after:top-0 after:bg-slate-400',
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
