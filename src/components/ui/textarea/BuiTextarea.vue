<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { textareaVariants } from '.'

const props = defineProps<{
  defaultValue?: string | number
  variant?: NonNullable<Parameters<typeof textareaVariants>[0]>['variant']
  modelValue?: string | number
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
  <textarea v-model="modelValue" :class="cn(textareaVariants({ variant }), $attrs.class ?? '')" />
</template>
