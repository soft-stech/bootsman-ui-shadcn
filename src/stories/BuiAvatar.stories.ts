import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { BuiAvatar, BuiAvatarImage, BuiAvatarFallback } from '@/components/avatar'

const meta = {
  component: BuiAvatar,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['circle', 'square']
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg']
    }
  },
  args: {
    shape: 'circle',
    size: 'base'
  }
} satisfies Meta<typeof BuiAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiAvatar, BuiAvatarImage, BuiAvatarFallback },
    setup() {
      return { args }
    },
    template: `
      <BuiAvatar v-bind="args">
        <BuiAvatarImage src="/src/assets/logo.png" alt="Bootsman" />
        <BuiAvatarFallback>B</BuiAvatarFallback>
      </BuiAvatar>
    `
  })
}

export const Fallback: Story = {
  render: (args) => ({
    components: { BuiAvatar, BuiAvatarImage, BuiAvatarFallback },
    setup() {
      return { args }
    },
    template: `
      <BuiAvatar v-bind="args">
        <BuiAvatarImage src="/src/assets/logo-xxx.png" alt="Bootsman" />
        <BuiAvatarFallback>B</BuiAvatarFallback>
      </BuiAvatar>
    `
  })
}
