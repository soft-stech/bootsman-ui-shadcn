import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { BuiToggleGroup, BuiToggleGroupItem } from '@/components/toggle-group'
import { Bold, Italic, Underline } from 'lucide-vue-next'

const meta = {
  component: BuiToggleGroup,
  subcomponents: { BuiToggleGroupItem },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple']
    }
  },
  args: {
    type: 'single'
  }
} satisfies Meta<typeof BuiToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiToggleGroup, BuiToggleGroupItem, Bold, Italic, Underline },
    setup() {
      return { args }
    },
    template: `
      <BuiToggleGroup v-bind="args">
        <BuiToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </BuiToggleGroupItem>
        <BuiToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic class="h-4 w-4" />
        </BuiToggleGroupItem>
        <BuiToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline class="h-4 w-4" />
        </BuiToggleGroupItem>
      </BuiToggleGroup>
    `
  })
}
