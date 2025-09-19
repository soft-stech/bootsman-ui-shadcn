import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiAlertDialog,
  BuiAlertDialogAction,
  BuiAlertDialogCancel,
  BuiAlertDialogContent,
  BuiAlertDialogDescription,
  BuiAlertDialogFooter,
  BuiAlertDialogHeader,
  BuiAlertDialogTitle,
  BuiAlertDialogTrigger
} from '@/components/alert-dialog'
import BuiButton from '@/components/button/BuiButton.vue'

const meta = {
  component: BuiAlertDialog,
  subcomponents: {
    BuiAlertDialogAction,
    BuiAlertDialogCancel,
    BuiAlertDialogContent,
    BuiAlertDialogDescription,
    BuiAlertDialogFooter,
    BuiAlertDialogHeader,
    BuiAlertDialogTitle,
    BuiAlertDialogTrigger
  },
  decorators: [() => ({ template: '<div class="flex justify-center p-10"><story/></div>' })],
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiAlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      BuiAlertDialog,
      BuiAlertDialogAction,
      BuiAlertDialogCancel,
      BuiAlertDialogContent,
      BuiAlertDialogDescription,
      BuiAlertDialogFooter,
      BuiAlertDialogHeader,
      BuiAlertDialogTitle,
      BuiAlertDialogTrigger,
      BuiButton
    },
    setup() {
      return { args }
    },
    template: `
      <BuiAlertDialog>
        <BuiAlertDialogTrigger as-child>
          <BuiButton variant="outline"> Show Dialog </BuiButton>
        </BuiAlertDialogTrigger>
        <BuiAlertDialogContent>
          <BuiAlertDialogHeader>
            <BuiAlertDialogTitle>Are you absolutely sure?</BuiAlertDialogTitle>
            <BuiAlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </BuiAlertDialogDescription>
          </BuiAlertDialogHeader>
          <BuiAlertDialogFooter>
            <BuiAlertDialogCancel>Cancel</BuiAlertDialogCancel>
            <BuiAlertDialogAction>Continue</BuiAlertDialogAction>
          </BuiAlertDialogFooter>
        </BuiAlertDialogContent>
      </BuiAlertDialog>
    `
  })
}
