import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { BuiPopover, BuiPopoverTrigger, BuiPopoverContent } from '@/components/popover'
import { BuiButton } from '@/components/button'
import { BuiInput } from '@/components/input'
import { BuiLabel } from '@/components/label'

const meta = {
  component: BuiPopover,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiPopover>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BuiPopover, BuiPopoverTrigger, BuiPopoverContent, BuiButton, BuiLabel, BuiInput },
    setup() {
      return { args }
    },
    template: `
      <BuiPopover>
        <BuiPopoverTrigger>
          <BuiButton variant="outline"> Open popover </BuiButton>
        </BuiPopoverTrigger>
        <BuiPopoverContent class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Dimensions</h4>
              <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <BuiLabel for="width">Width</BuiLabel>
                <BuiInput id="width" type="text" default-value="100%" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <BuiLabel for="maxWidth">Max. width</BuiLabel>
                <BuiInput
                  id="maxWidth"
                  type="text"
                  default-value="300px"
                  class="col-span-2 h-8"
                />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <BuiLabel for="height">Height</BuiLabel>
                <BuiInput id="height" type="text" default-value="25px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <BuiLabel for="maxHeight">Max. height</BuiLabel>
                <BuiInput
                  id="maxHeight"
                  type="text"
                  default-value="none"
                  class="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </BuiPopoverContent>
      </BuiPopover>
    `
  })
}
