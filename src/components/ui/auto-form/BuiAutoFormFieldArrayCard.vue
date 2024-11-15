<script setup lang="ts" generic="T extends z.ZodAny">
import * as z from 'zod'
import { computed, provide } from 'vue'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
import { FieldArray, FieldContextKey, useField } from 'vee-validate'
import type { Config, ConfigItem } from './interface'
import { beautifyObjectName, getBaseType } from './utils'
import AutoFormField from './BuiAutoFormField.vue'
import { BuiButton as Button } from '@/components/ui/button'
import { BuiSeparator as Separator } from '@/components/ui/separator'
import { BuiFormItem as FormItem, BuiFormMessage as FormMessage } from '@/components/ui/form'
import { BuiCard, BuiCardContent, BuiCardHeader, BuiCardTitle } from '@/components/ui/card'

const props = defineProps<{
  fieldName: string
  required?: boolean
  config?: Config<T>
  schema?: z.ZodArray<T>
  disabled?: boolean
}>()

function isZodArray(item: z.ZodArray<any> | z.ZodDefault<any>): item is z.ZodArray<any> {
  return item instanceof z.ZodArray
}

function isZodDefault(item: z.ZodArray<any> | z.ZodDefault<any>): item is z.ZodDefault<any> {
  return item instanceof z.ZodDefault
}

const itemShape = computed(() => {
  if (!props.schema) return

  const schema: z.ZodAny = isZodArray(props.schema)
    ? props.schema._def.type
    : isZodDefault(props.schema)
      ? // @ts-expect-error missing schema
        props.schema._def.innerType._def.type
      : null

  return {
    type: getBaseType(schema),
    schema
  }
})

const fieldContext = useField(props.fieldName)
// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext)
</script>

<template>
  <FieldArray v-slot="{ fields, remove, push }" as="section" :name="fieldName">
    <slot v-bind="props">
      <BuiCard as-child class="w-full border-0 shadow-none">
        <FormItem>
          <BuiCardHeader class="border-b-[1px] border-b-border/[0.16] py-1">
            <BuiCardTitle class="py-0 text-base">
              {{
                schema?.description ||
                beautifyObjectName(fieldName.split('.')[fieldName.split('.').length - 1])
              }}
            </BuiCardTitle>
          </BuiCardHeader>
          <BuiCardContent class="flex flex-col gap-5 pb-0 pr-0">
            <template v-for="(field, index) of fields" :key="field.key">
              <div class="mb-4 p-1">
                <AutoFormField
                  :field-name="`${fieldName}[${index}]`"
                  :label="fieldName"
                  :shape="itemShape!"
                  :config="config as ConfigItem"
                />

                <div class="!my-4 flex justify-end">
                  <Button type="button" size="icon" variant="secondary" @click="remove(index)">
                    <TrashIcon :size="16" />
                  </Button>
                </div>
                <Separator v-if="!field.isLast" />
              </div>
            </template>

            <Button
              type="button"
              variant="secondary"
              class="mt-4 flex items-center"
              @click="push(null)"
            >
              <PlusIcon class="mr-2" :size="16" />
            </Button>
            <FormMessage />
          </BuiCardContent>
        </FormItem>
      </BuiCard>
    </slot>
  </FieldArray>
</template>
