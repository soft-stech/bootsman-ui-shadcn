import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BuiTextarea from '@/components/textarea/BuiTextarea.vue'
import BuiLabel from '@/components/label/BuiLabel.vue'

const meta = {
  component: BuiTextarea,
  decorators: [
    () => ({ template: '<div class="grid w-full max-w-sm items-center gap-1.5"><story/></div>' })
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success']
    }
  },
  args: {
    readonly: false,
    variant: 'default',
    disabled: false,
    placeholder: 'Email'
  }
} satisfies Meta<typeof BuiTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiTextarea, BuiLabel },
    setup() {
      return { args }
    },
    template: `
      <BuiLabel for="email">Email</BuiLabel>
      <BuiTextarea v-bind="args" />
    `
  })
}

export const AriaInvalid: Story = {
  name: 'Error based on aria-invalid',
  render: (args) => ({
    components: { BuiTextarea, BuiLabel },
    setup() {
      return { args }
    },
    template: `
      <BuiLabel for="email">Email</BuiLabel>
      <BuiTextarea v-bind="args" aria-invalid="true"/>
    `
  })
}
