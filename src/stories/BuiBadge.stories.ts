import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BuiBadge from '@/components/badge/BuiBadge.vue'

const meta = {
  component: BuiBadge,
  tags: ['autodocs'],
  args: {
    dismissable: false
  }
} satisfies Meta<typeof BuiBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiBadge },
    setup() {
      return { args }
    },
    template: `
      <BuiBadge v-bind="args">Name tag</BuiBadge>
    `
  })
}

export const Truncated: Story = {
  args: {
    dismissable: true,
    class: 'w-[100px]'
  },
  render: (args) => ({
    components: { BuiBadge },
    setup() {
      return { args }
    },
    template: `
      <BuiBadge v-bind="args">Very long tag name example</BuiBadge>
    `
  })
}
