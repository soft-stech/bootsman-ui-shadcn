import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { BuiAlert, BuiAlertTitle, BuiAlertDescription } from '@/components/alert'
import BuiButton from '@/components/button/BuiButton.vue'
import { AlertTriangle, X } from 'lucide-vue-next'

const meta = {
  component: BuiAlert,
  subcomponents: { BuiAlertTitle, BuiAlertDescription },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info']
    }
  },
  args: {
    variant: 'default'
  }
} satisfies Meta<typeof BuiAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiAlert, BuiAlertTitle, BuiAlertDescription, BuiButton, AlertTriangle, X },
    setup() {
      return { args }
    },
    template: `
      <BuiAlert v-bind="args">
          <BuiAlertTitle> Alert Title </BuiAlertTitle>
          <BuiAlertDescription> Alert Description </BuiAlertDescription>

          <template #icon>
            <AlertTriangle class="h-4 w-4" aria-hidden="true" />
          </template>
          <template #actions>
            <BuiButton variant="ghost" size="icon">
              <span class="sr-only">Dismiss</span>
              <X class="h-5 w-5" aria-hidden="true" />
            </BuiButton>
          </template>
        </BuiAlert>
    `
  })
}
