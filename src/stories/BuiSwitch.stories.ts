import { BuiSwitch } from '@/components/switch'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta = {
  component: BuiSwitch,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    disabled: false
  }
} satisfies Meta<typeof BuiSwitch>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BuiSwitch },
    setup() {
      const isChecked = ref(false)
      return { args, isChecked }
    },
    template: '<BuiSwitch v-bind="args" v-model="isChecked" />'
  })
}
