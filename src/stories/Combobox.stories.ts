import { BuiCommand } from '@/components/command'
import ComboboxStoryDefault from '@/stories/components/ComboboxStoryDefault.vue'
import ComboboxStoryFormFields from '@/stories/components/ComboboxStoryFormFields.vue'
import ComboboxStoryMultipleCreate from '@/stories/components/ComboboxStoryMultipleCreate.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  // @ts-expect-error not BuiCommand story
  component: BuiCommand,
  title: 'Combobox',
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiCommand>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'BuiPopover + BuiCommand',
  render: () => ({
    components: { ComboboxStoryDefault },
    template: `<ComboboxStoryDefault />`
  })
}

export const FormFields: Story = {
  name: 'Select style + form fields',
  render: () => ({
    components: { ComboboxStoryFormFields },
    template: `<ComboboxStoryFormFields />`
  })
}

export const MultipleCreate: Story = {
  name: 'Multiselect + create',
  render: () => ({
    components: { ComboboxStoryMultipleCreate },
    template: `<ComboboxStoryMultipleCreate />`
  })
}
