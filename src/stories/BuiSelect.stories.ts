import {
  BuiSelect,
  BuiSelectContent,
  BuiSelectItem,
  BuiSelectItemText,
  BuiSelectLabel,
  BuiSelectSeparator,
  BuiSelectGroup,
  BuiSelectTrigger,
  BuiSelectValue
} from '@/components/select'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { toTypedSchema } from '@vee-validate/zod'
import { BringToFrontIcon } from 'lucide-vue-next'
import z from 'zod'

import {
  BuiForm,
  BuiFormField,
  BuiFormItem,
  BuiFormControl,
  BuiFormMessage
} from '@/components/form'

const meta = {
  component: BuiSelect,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiSelect>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiSelect,
      BuiSelectTrigger,
      BuiSelectValue,
      BuiSelectContent,
      BuiSelectGroup,
      BuiSelectItem,
      BuiSelectItemText,
      BuiSelectLabel
    },
    setup() {
      return { args }
    },
    template: `
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
    `
  })
}

export const CustomIcon: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiSelect,
      BuiSelectTrigger,
      BuiSelectValue,
      BuiSelectContent,
      BuiSelectGroup,
      BuiSelectItem,
      BuiSelectItemText,
      BuiSelectLabel,
      BringToFrontIcon
    },
    setup() {
      return { args }
    },
    template: `
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
    `
  })
}

export const WithValidation: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiSelect,
      BuiSelectTrigger,
      BuiSelectValue,
      BuiSelectContent,
      BuiSelectGroup,
      BuiSelectItem,
      BuiSelectItemText,
      BuiSelectLabel,
      BringToFrontIcon,
      BuiForm,
      BuiFormField,
      BuiFormItem,
      BuiFormControl,
      BuiFormMessage
    },
    setup() {
      const validationRules = z.object({
        favoriteFruit: z.enum(['banana'])
      })
      const validationSchema = toTypedSchema(validationRules)
      const initialValues = {
        favoriteFruit: 'apple'
      }

      return { args }
    },
    template: `
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
    `
  })
}
