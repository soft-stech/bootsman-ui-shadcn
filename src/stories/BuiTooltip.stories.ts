import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiTooltip,
  BuiTooltipContent,
  BuiTooltipProvider,
  BuiTooltipTrigger
} from '@/components/tooltip'
import BuiButton from '@/components/button/BuiButton.vue'

const meta = {
  component: BuiTooltip,
  subcomponents: { BuiTooltipContent, BuiTooltipProvider, BuiTooltipTrigger },
  decorators: [() => ({ template: '<div class="flex justify-center pt-12"><story/></div>' })],
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiTooltip, BuiTooltipContent, BuiTooltipProvider, BuiTooltipTrigger, BuiButton },
    setup() {
      return { args }
    },
    template: `
      <BuiTooltipProvider v-bind="args">
        <BuiTooltip>
          <BuiTooltipTrigger as-child>
            <BuiButton variant="outline"> Hover </BuiButton>
          </BuiTooltipTrigger>
          <BuiTooltipContent>
            <p>Hello there</p>
          </BuiTooltipContent>
        </BuiTooltip>
      </BuiTooltipProvider>
    `
  })
}

export const WithScroll: Story = {
  render: (args) => ({
    components: { BuiTooltip, BuiTooltipContent, BuiTooltipProvider, BuiTooltipTrigger, BuiButton },
    setup() {
      return { args }
    },
    template: `
      <BuiTooltipProvider v-bind="args">
        <BuiTooltip>
          <BuiTooltipTrigger as-child>
            <BuiButton variant="outline"> Hover </BuiButton>
          </BuiTooltipTrigger>
          <BuiTooltipContent>
            <p>1 Hello there</p>
            <p>2 Hello there</p>
            <p>3 <a href="#">Hello there</a></p>
            <p>4 Hello there</p>
            <p>5 Hello there</p>
            <p>6 Hello there</p>
            <p>7 Hello there</p>
            <p>8 Hello there</p>
            <p>9 Hello there</p>
          </BuiTooltipContent>
        </BuiTooltip>
      </BuiTooltipProvider>
    `
  })
}
