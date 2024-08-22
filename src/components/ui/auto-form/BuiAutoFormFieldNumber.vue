<script setup lang="ts">
import AutoFormLabel from './BuiAutoFormLabel.vue'
import { beautifyObjectName } from './utils'
import type { FieldProps } from './interface'
import {
  BuiFormControl as FormControl,
  BuiFormDescription as FormDescription,
  BuiFormField as FormField,
  BuiFormItem as FormItem,
  BuiFormMessage as FormMessage
} from '@/components/ui/form'
import { BuiInput as Input } from '@/components/ui/input'

defineOptions({
  inheritAttrs: false
})

defineProps<FieldProps>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input
            type="number"
            v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
            :disabled="disabled"
          />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
