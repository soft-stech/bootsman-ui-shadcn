import { BuiLabel } from '@/components/label'
import { BuiSwitch } from '@/components/switch'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiLabel
} satisfies Meta<typeof BuiLabel>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiLabel, BuiSwitch },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center space-x-2 p-1">
        <BuiSwitch id="my-test-id" />
        <BuiLabel for="my-test-id">My label</BuiLabel>
      </div>
    `
  })
}
