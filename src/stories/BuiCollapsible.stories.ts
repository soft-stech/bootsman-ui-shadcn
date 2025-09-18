import { BuiCollapsible } from '@/components/collapsible'
import BuiCollapsibleStory from '@/stories/components/BuiCollapsibleStory.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiCollapsible,
  // tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiCollapsible>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiCollapsibleStory },
    setup() {
      return { args }
    },
    template: `<BuiCollapsibleStory />`
  })
}
