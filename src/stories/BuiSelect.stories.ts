import {
  BuiSelect,
  BuiSelectContent,
  BuiSelectItem,
  BuiSelectItemText,
  BuiSelectLabel,
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

      return { args, validationSchema, initialValues }
    },
    template: `
      <BuiForm
        :validation-schema="validationSchema"
        :initial-values="initialValues"
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
