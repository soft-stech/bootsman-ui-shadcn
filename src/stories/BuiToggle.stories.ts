import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BuiToggle from '@/components/toggle/BuiToggle.vue'
import { BoldIcon } from 'lucide-vue-next'

const meta = {
  component: BuiToggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg']
    }
  },
  args: {
    disabled: false,
    size: 'sm',
    variant: 'default'
  }
} satisfies Meta<typeof BuiToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiToggle, BoldIcon },
    setup() {
      return { args }
    },
    template: `
      <BuiToggle v-bind="args" aria-label="Toggle something">
        <BoldIcon class="h-4 w-4" />
      </BuiToggle>
    `
  })
}

export const WithText: Story = {
  render: (args) => ({
    components: { BuiToggle, BoldIcon },
    setup() {
      return { args }
    },
    template: `
      <BuiToggle v-bind="args" aria-label="Toggle something">
        <BoldIcon class="h-4 w-4" />
        Bold
      </BuiToggle>
    `
  })
}
