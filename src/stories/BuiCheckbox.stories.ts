import { BuiCheckbox } from '@/components/checkbox'
import { BuiLabel } from '@/components/label'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta = {
  component: BuiCheckbox,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    disabled: false
  }
} satisfies Meta<typeof BuiCheckbox>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BuiCheckbox, BuiLabel },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="flex items-center space-x-2 p-1">
        <BuiCheckbox id="my-test-id1" v-model="checked" v-bind="args" />
        <BuiLabel for="my-test-id1">My label</BuiLabel>
      </div>
    `
  })
}
