<script setup lang="ts">
import { computed } from 'vue'
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
import { BuiTextarea as Textarea } from '@/components/ui/textarea'

const props = defineProps<FieldProps>()
const inputComponent = computed(() => (props.config?.component === 'textarea' ? Textarea : Input))
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <component
            :is="inputComponent"
            type="text"
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
