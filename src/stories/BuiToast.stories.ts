import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import { BuiToaster, BuiToastAction, useToast } from '@/components/toast'
import BuiButton from '@/components/button/BuiButton.vue'

const meta = {
  component: BuiToaster,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiToaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiToaster, BuiToastAction, BuiButton },
    setup() {
      const { toast } = useToast()

      const handleToast = () => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
          action: h(
            BuiToastAction,
            {
              altText: 'Close'
            },
            {
              default: () => 'Close'
            }
          )
        })
      }
      return { args, handleToast }
    },
    template: `
      <BuiToaster />

      <BuiButton
        variant="outline"
        @click="handleToast"
      >
        Add to calendar
      </BuiButton>
    `
  })
}

export const Destructive: Story = {
  render: (args) => ({
    components: { BuiToaster, BuiToastAction, BuiButton },
    setup() {
      const { toast } = useToast()

      const handleToast = () => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          variant: 'destructive',
          action: h(
            BuiToastAction,
            {
              altText: 'Try again'
            },
            {
              default: () => 'Try again'
            }
          )
        })
      }
      return { args, handleToast }
    },
    template: `
      <BuiToaster />

      <BuiButton
        variant="outline"
        @click="handleToast"
      >
        Add to calendar
      </BuiButton>
    `
  })
}
