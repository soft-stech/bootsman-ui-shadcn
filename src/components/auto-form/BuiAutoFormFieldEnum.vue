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
} from '@/components/form'
import {
  BuiSelect as Select,
  BuiSelectContent as SelectContent,
  BuiSelectItem as SelectItem,
  BuiSelectTrigger as SelectTrigger,
  BuiSelectValue as SelectValue
} from '@/components/select'
import { BuiLabel as Label } from '@/components/label'
import {
  BuiRadioGroup as RadioGroup,
  BuiRadioGroupItem as RadioGroupItem
} from '@/components/radio-group'

defineProps<
  FieldProps & {
    options?: string[]
  }
>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <RadioGroup
            v-if="config?.component === 'radio'"
            :disabled="disabled"
            :orientation="'vertical'"
            v-bind="{ ...slotProps.componentField }"
          >
            <div
              v-for="(option, index) in options"
              :key="option"
              class="mb-2 flex items-center gap-3 space-y-0"
            >
              <RadioGroupItem :id="`${option}-${index}`" :value="option" />
              <Label :for="`${option}-${index}`">{{ beautifyObjectName(option) }}</Label>
            </div>
          </RadioGroup>

          <Select v-else :disabled="disabled" v-bind="{ ...slotProps.componentField }">
            <SelectTrigger class="w-full">
              <SelectValue :placeholder="config?.inputProps?.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in options" :key="option" :value="option">
                {{ beautifyObjectName(option) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
