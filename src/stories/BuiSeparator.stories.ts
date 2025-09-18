import { BuiSeparator } from '@/components/separator'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiSeparator,
  // tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiSeparator>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BuiSeparator },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <BuiSeparator class="my-4" />
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <BuiSeparator orientation="vertical" />
        <div>Docs</div>
        <BuiSeparator orientation="vertical" />
        <div>Source</div>
      </div>
    `
  })
}
