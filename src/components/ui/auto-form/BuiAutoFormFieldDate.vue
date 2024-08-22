<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { beautifyObjectName } from './utils'
import AutoFormLabel from './BuiAutoFormLabel.vue'
import type { FieldProps } from './interface'
import {
  BuiFormControl as FormControl,
  BuiFormDescription as FormDescription,
  BuiFormField as FormField,
  BuiFormItem as FormItem,
  BuiFormMessage as FormMessage
} from '@/components/ui/form'

import { BuiCalendar as Calendar } from '@/components/ui/calendar'
import { BuiButton as Button } from '@/components/ui/button'
import {
  BuiPopover as Popover,
  BuiPopoverContent as PopoverContent,
  BuiPopoverTrigger as PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

defineProps<FieldProps>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <div>
            <Popover>
              <PopoverTrigger as-child :disabled="disabled">
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-full justify-start text-left font-normal',
                      !slotProps.componentField.modelValue && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" :size="16" />
                  {{
                    slotProps.componentField.modelValue
                      ? df.format(slotProps.componentField.modelValue.toDate(getLocalTimeZone()))
                      : 'Pick a date'
                  }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar initial-focus v-bind="slotProps.componentField" />
              </PopoverContent>
            </Popover>
          </div>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
