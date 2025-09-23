import { BuiPopover } from '@/components/popover'
import DatePickerStory from '@/stories/components/DatePickerStory.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'DatePicker',
  component: BuiPopover,
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiPopover>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'DatePicker',
  args: {},
  render: () => ({
    components: { DatePickerStory },
    template: `<DatePickerStory />`
  })
}
