import { BuiInput, BuiPasswordInput } from '@/components/input'
import { BuiLabel } from '@/components/label'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success']
    }
  },
  args: {
    disabled: false,
    placeholder: 'Email',
    type: 'email',
    variant: 'default'
  }
} satisfies Meta<typeof BuiInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiInput, BuiLabel },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <BuiLabel for="email">Email</BuiLabel>
        <BuiInput id="email" v-bind="args" />
      </div>
    `
  })
}

export const Password: Story = {
  render: (args) => ({
    components: { BuiPasswordInput, BuiLabel },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="password">Password</BuiLabel>
          <BuiPasswordInput v-bind="args" id="password" default-value="text" placeholder="Password"/>
        </div>
    `
  })
}
