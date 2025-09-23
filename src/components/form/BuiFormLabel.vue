<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Label } from 'reka-ui'
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false
})
const { error, formItemId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <Label
    :class="
      cn(
        'text-foreground block text-left text-sm font-medium tracking-tight',
        error && 'text-destructive-foreground',
        className ?? ''
      )
    "
    :for="formItemId"
    v-bind="rest"
  >
    <slot />
  </Label>
</template>
