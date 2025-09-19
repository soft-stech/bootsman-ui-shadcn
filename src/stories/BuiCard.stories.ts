import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiCard,
  BuiCardContent,
  BuiCardDescription,
  BuiCardFooter,
  BuiCardHeader,
  BuiCardTitle
} from '@/components/card'
import BuiCardStory from './components/BuiCardStory.vue'

const meta = {
  component: BuiCard,
  subcomponents: { BuiCardContent, BuiCardDescription, BuiCardFooter, BuiCardHeader, BuiCardTitle },
  tags: ['autodocs'],
  args: {
    class: 'w-[350px]'
  }
} satisfies Meta<typeof BuiCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiCardStory },
    setup() {
      return { args }
    },
    template: `
      <BuiCardStory v-bind="args" />
    `
  })
}
