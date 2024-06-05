<script setup lang="ts">
import {
  BuiSelect,
  BuiSelectContent,
  BuiSelectGroup,
  BuiSelectItem,
  BuiSelectLabel,
  BuiSelectTrigger,
  BuiSelectValue
} from '@/components/ui/select'
import { BringToFrontIcon } from 'lucide-vue-next'
import {
  BuiForm,
  BuiFormField,
  BuiFormItem,
  BuiFormControl,
  BuiFormMessage
} from '@/components/ui/form'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const validationRules = z.object({
  favoriteFruit: z.enum(['banana'])
})
const validationSchema = toTypedSchema(validationRules)
const initialValues = {
  favoriteFruit: 'apple'
}
</script>

<template>
  <Story title="BuiSelect" autoPropsDisabled>
    <Variant title="Default">
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiSelect>
          <BuiSelectTrigger class="w-[180px]">
            <BuiSelectValue placeholder="Select a fruit" />
          </BuiSelectTrigger>
          <BuiSelectContent>
            <BuiSelectGroup>
              <BuiSelectLabel>Fruits</BuiSelectLabel>
              <BuiSelectItem value="apple"> Apple </BuiSelectItem>
              <BuiSelectItem value="banana"> Banana </BuiSelectItem>
              <BuiSelectItem value="blueberry"> Blueberry </BuiSelectItem>
              <BuiSelectItem value="grapes"> Grapes </BuiSelectItem>
              <BuiSelectItem value="pineapple"> Pineapple </BuiSelectItem>
            </BuiSelectGroup>
          </BuiSelectContent>
        </BuiSelect>
      </div>
    </Variant>
    <Variant title="Custom Icon">
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiSelect>
          <BuiSelectTrigger class="w-[180px]">
            <BuiSelectValue placeholder="Select a fruit" />
            <template #icon>
              <BringToFrontIcon class="h-4 w-4 opacity-50" />
            </template>
          </BuiSelectTrigger>
          <BuiSelectContent>
            <BuiSelectGroup>
              <BuiSelectLabel>Fruits</BuiSelectLabel>
              <BuiSelectItem value="apple"> Apple </BuiSelectItem>
              <BuiSelectItem value="banana"> Banana </BuiSelectItem>
              <BuiSelectItem value="blueberry"> Blueberry </BuiSelectItem>
              <BuiSelectItem value="grapes"> Grapes </BuiSelectItem>
              <BuiSelectItem value="pineapple"> Pineapple </BuiSelectItem>
            </BuiSelectGroup>
          </BuiSelectContent>
        </BuiSelect>
      </div>
    </Variant>
    <Variant title="With validation">
      <BuiForm
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        class="flex min-h-[350px] w-full flex-col items-center justify-center gap-4 p-10"
      >
        <BuiFormField name="favoriteFruit" v-slot="{ componentField, meta }">
          <BuiFormItem>
            <BuiFormControl>
              <BuiSelect v-bind="componentField">
                <BuiSelectTrigger
                  class="w-[180px]"
                  v-bind="componentField"
                  :invalid="meta.validated && !meta.valid"
                >
                  <BuiSelectValue placeholder="Select a fruit" />
                </BuiSelectTrigger>
                <BuiSelectContent>
                  <BuiSelectGroup>
                    <BuiSelectLabel>Fruits</BuiSelectLabel>
                    <BuiSelectItem value="apple"> Apple </BuiSelectItem>
                    <BuiSelectItem value="banana"> Banana </BuiSelectItem>
                    <BuiSelectItem value="blueberry"> Blueberry </BuiSelectItem>
                    <BuiSelectItem value="grapes"> Grapes </BuiSelectItem>
                    <BuiSelectItem value="pineapple"> Pineapple </BuiSelectItem>
                  </BuiSelectGroup>
                </BuiSelectContent>
              </BuiSelect>
            </BuiFormControl>
            <BuiFormMessage />
          </BuiFormItem>
        </BuiFormField>
      </BuiForm>
    </Variant>
  </Story>
</template>
