import { BuiScrollArea } from '@/components/scroll-area'
import BuiScrollAreaStory from '@/stories/components/BuiScrollAreaStory.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiScrollArea,
  // tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiScrollAreaStory },
    setup() {
      return { args }
    },
    template: '<BuiScrollAreaStory />'
  })
}
