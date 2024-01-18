<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { inputVariants } from '.'

const props = defineProps<{
  defaultValue?: string | number
  variant?: NonNullable<Parameters<typeof inputVariants>[0]>['variant']
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
</script>

<template>
  <input v-model="modelValue" :class="cn(inputVariants({ variant }), props.class ?? '')" />
</template>
