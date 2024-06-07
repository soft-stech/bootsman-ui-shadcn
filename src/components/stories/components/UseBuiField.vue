<script setup lang="ts">
import BuiButton from '@/components/ui/button/BuiButton.vue'
import BuiInput from '@/components/ui/input/BuiInput.vue'

import {
  BuiFormControl,
  BuiFormField,
  BuiFormItem,
  BuiFormLabel,
  BuiFormMessage,
  useBuiForm
} from '@/components/ui/form'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import SubForm from '@/components/stories/components/SubForm.vue'

const formSchema = toTypedSchema(
  z.object({
    meta: z.object({ field: z.string().trim().min(1) }),
    example: z.string().trim().min(1)
  })
)

const initialValues = {
  meta: {
    field: 'Value 1'
  },
  example: 'Value 2'
}

const { handleSubmit, meta } = useBuiForm({
  validationSchema: formSchema,
  initialValues
})

const onSubmit = handleSubmit((values) => {
  console.debug('Form submitted!', values)
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          This example shows how to combine useBuiForm and useBuiField to access model values inside
          internal components.
        </div>

        <form class="mt-4 space-y-6" @submit="onSubmit">
          <BuiFormField v-slot="{ componentField }" name="meta.field">
            <BuiFormItem>
              <BuiFormLabel>Field 1</BuiFormLabel>
              <div class="mt-2">
                <BuiFormControl>
                  <BuiInput type="test" placeholder="" v-bind="componentField" />
                </BuiFormControl>
                <BuiFormMessage class="mt-1" />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <BuiFormField v-slot="{ componentField }" name="example">
            <BuiFormItem>
              <BuiFormLabel>Field 2</BuiFormLabel>
              <div class="mt-2">
                <BuiFormControl>
                  <BuiInput type="text" v-bind="componentField" />
                </BuiFormControl>
                <BuiFormMessage class="mt-1" />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <SubForm />

          <div>
            <BuiButton class="w-full" type="submit" :disabled="!meta.valid">Submit</BuiButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
