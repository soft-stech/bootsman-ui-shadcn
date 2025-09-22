import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { BuiRadioGroup, BuiRadioGroupItem } from '@/components/radio-group'
import BuiLabel from '@/components/label/BuiLabel.vue'

const meta = {
  component: BuiRadioGroup,
  subcomponents: { BuiRadioGroupItem },
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiRadioGroup, BuiRadioGroupItem, BuiLabel },
    setup() {
      return { args }
    },
    template: `
      <BuiRadioGroup default-value="option-one">
        <div class="flex items-center space-x-2">
          <BuiRadioGroupItem id="option-one" value="option-one" />
          <BuiLabel for="option-one">Option One</BuiLabel>
        </div>
        <div class="flex items-center space-x-2">
          <BuiRadioGroupItem id="option-two" value="option-two" />
          <BuiLabel for="option-two">Option Two</BuiLabel>
        </div>
        <div class="flex items-center space-x-2">
          <BuiRadioGroupItem id="option-three" value="option-three" disabled />
          <BuiLabel for="option-three" class="opacity-50">Option Three Disabled</BuiLabel>
        </div>
      </BuiRadioGroup>
    `
  })
}
