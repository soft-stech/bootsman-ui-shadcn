import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { BuiHoverCard, BuiHoverCardContent, BuiHoverCardTrigger } from '@/components/hover-card'
import BuiHoverCardStory from './components/BuiHoverCardStory.vue'

const meta = {
  component: BuiHoverCard,
  subcomponents: { BuiHoverCardContent, BuiHoverCardTrigger },
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiHoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiHoverCardStory },
    setup() {
      return { args }
    },
    template: `
      <BuiHoverCardStory v-bind="args" />
    `
  })
}
