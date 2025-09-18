import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BuiProgress from '@/components/progress/BuiProgress.vue'
import BuiSlider from '@/components/slider/BuiSlider.vue'

const meta = {
  component: BuiProgress,
  decorators: [() => ({ template: '<div class="flex flex-col gap-2 w-sm p-10"><story/></div>' })],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['sm', 'default', 'lg']
    },
    color: {
      control: 'select',
      options: ['primary', 'green', 'red', 'orange']
    }
  },
  args: {
    variant: 'sm',
    color: 'primary'
  }
} satisfies Meta<typeof BuiProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiProgress },
    setup() {
      return { args }
    },
    template: `
      <BuiProgress :model-value="50" v-bind="args" />
    `
  })
}

export const Separators: Story = {
  args: {
    ...Default.args,
    separators: [10, 35]
  },
  render: (args) => ({
    components: { BuiProgress },
    setup() {
      return { args }
    },
    template: `
      <BuiProgress :model-value="50" v-bind="args" />
    `
  })
}

export const WithSlider: Story = {
  name: 'With Slider',
  render: (args) => ({
    components: { BuiProgress, BuiSlider },
    setup() {
      const modelValue = ref([50])

      return { args, modelValue }
    },
    template: `
      <div class="mb-3">Value: {{ modelValue[0] }}</div>
      <BuiProgress :model-value="modelValue[0]" v-bind="args" />
      <BuiSlider v-model="modelValue" :max="100" :step="1" class="max-full" />
    `
  })
}
