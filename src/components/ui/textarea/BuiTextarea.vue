<script setup lang="ts">
import { ref } from 'vue'
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

const isFocused = ref<Boolean>(false)

const handleFocus = () => {
  isFocused.value = true
}
const handleBlur = () => {
  isFocused.value = false
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Home' || e.key === 'End' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (isFocused.value) {
      e.stopPropagation()
    }
  }
}
</script>

<template>
  <textarea
    v-model="modelValue"
    :class="cn(textareaVariants({ variant }), $attrs.class ?? '')"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown="handleKeyDown"
  />
</template>
