import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BuiColorPicker from '@/components/color-picker/BuiColorPicker.vue'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/popover'
import BuiButton from '@/components/button/BuiButton.vue'

const meta = {
  component: BuiColorPicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'xs', 'md', 'lg', 'xl']
    },
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl', 'cmyk', 'lab']
    }
  },
  args: {
    disabled: false,
    defaultValue: '#29CCFF',
    as: 'div',
    format: 'hex',
    size: 'md',
    throttle: 50
  }
} satisfies Meta<typeof BuiColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiColorPicker },
    setup() {
      return { args }
    },
    template: `
      <BuiColorPicker v-bind="args" />
    `
  })
}

export const AsPopover: Story = {
  name: 'As Popover',
  decorators: [
    () => ({ template: '<div class="flex w-full flex-row justify-center pt-4"><story/></div>' })
  ],
  args: {
    size: 'md'
  },
  render: (args) => ({
    components: { BuiColorPicker, BuiPopover, BuiPopoverContent, BuiPopoverTrigger, BuiButton },
    setup() {
      const pickedColor = ref<string>('#29CCFF')

      return { args, pickedColor }
    },
    template: `
      <BuiPopover>
          <BuiPopoverTrigger>
            <BuiButton
              variant="outline"
              class="flex flex-row gap-2 text-sm"
              :style="{ color: pickedColor, borderColor: pickedColor }"
            >
              <span :style="{ backgroundColor: pickedColor }" class="size-3 rounded-full" />
              <span>Pick a color</span>
            </BuiButton>
          </BuiPopoverTrigger>
          <BuiPopoverContent class="w-80">
            <div class="flex flex-col gap-4 p-4">
              <BuiColorPicker v-model="pickedColor" v-bind="args" />
            </div>
          </BuiPopoverContent>
        </BuiPopover>
    `
  })
}
