import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { BuiStepper } from '@/components/stepper'
import BuiStepperStory from './components/BuiStepperStory.vue'

const meta = {
  component: BuiStepper
} satisfies Meta<typeof BuiStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    class: 'flex w-full items-start gap-2 p-10'
  },
  render: (args) => ({
    components: { BuiStepperStory },
    setup() {
      return { args }
    },
    template: `
      <BuiStepperStory v-bind="args"/>
    `
  })
}

export const Vertical: Story = {
  args: {
    class: 'mx-auto flex w-full max-w-md flex-col justify-start gap-10 p-10',
    orientation: 'vertical'
  },
  render: (args) => ({
    components: { BuiStepperStory },
    setup() {
      return { args }
    },
    template: `
      <BuiStepperStory v-bind="args" />
    `
  })
}
