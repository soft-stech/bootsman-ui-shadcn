<script setup lang="ts">
import { FORM_READONLY_INJECTION_KEY } from '@/components/form'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { inject, ref, toRef, useTemplateRef, type HTMLAttributes } from 'vue'
import { inputVariants } from '.'
import BuiButton from '@/components/button/BuiButton.vue'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  defaultValue?: string | number
  variant?: NonNullable<Parameters<typeof inputVariants>[0]>['variant']
  modelValue?: string | number
  class?: HTMLAttributes['class']
  readonly?: boolean | 'true' | 'false'
  disabled?: boolean
  placeholder?: string
  type?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

// Inject readonly state from context
const readonlyContext = inject(FORM_READONLY_INJECTION_KEY, toRef(false))

const isFocused = ref<boolean>(false)
const searchInput = useTemplateRef<HTMLElement>('searchInput')

const handleFocus = () => {
  isFocused.value = true
}
const handleBlur = () => {
  isFocused.value = false
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Home' || e.key === 'End') {
    if (isFocused.value) {
      e.stopPropagation()
    }
  }
}

const handleClear = () => {
  if (searchInput.value) {
    searchInput.value.focus()
    modelValue.value = ''
  }
}
</script>

<template>
  <div v-if="props.type === 'search'" class="group relative flex flex-row items-center">
    <input
      ref="searchInput"
      v-model="modelValue"
      :class="
        cn(
          inputVariants({ variant }),
          props.class ?? '',
          'pr-6',
          !props.variant || props.variant === 'default' ? 'group-hover:border-primary' : ''
        )
      "
      :readonly="readonlyContext || props.readonly"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      type="text"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeyDown"
    />
    <BuiButton
      v-if="modelValue && modelValue.toString().length > 0"
      variant="none"
      class="hover:text-primary text-foreground invisible absolute top-2 right-2 h-fit w-fit p-[1px] group-hover:visible"
      @click="handleClear"
    >
      <X :size="14" class="pointer-events-none shrink-0" />
    </BuiButton>
  </div>
  <input
    v-else
    v-model="modelValue"
    :class="cn(inputVariants({ variant }), props.class ?? '')"
    :readonly="readonlyContext || props.readonly"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :type="props.type || 'text'"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown="handleKeyDown"
  />
</template>
