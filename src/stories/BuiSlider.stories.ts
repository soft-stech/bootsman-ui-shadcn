import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BuiSlider from '@/components/slider/BuiSlider.vue'

const meta = {
  component: BuiSlider,
  decorators: [() => ({ template: '<div class="flex flex-col gap-2 w-sm p-10"><story/></div>' })],
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    inverted: false,
    class: 'w-full'
  }
} satisfies Meta<typeof BuiSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiSlider },
    setup() {
      const modelValue = ref([50])

      return { args, modelValue }
    },
    template: `
      <div class="mb-3">Value: {{ modelValue[0] }}</div>

      <BuiSlider
        v-model="modelValue"
        v-bind="args"
      />
    `
  })
}
