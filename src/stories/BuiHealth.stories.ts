import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import BuiHealth from '@/components/health/BuiHealth.vue'
import BuiSlider from '@/components/slider/BuiSlider.vue'

const meta = {
  component: BuiHealth,
  decorators: [() => ({ template: '<div class="flex flex-col gap-2"><story/></div>' })],
  tags: ['autodocs'],
  args: {
    class: 'max-w-[300px]'
  }
} satisfies Meta<typeof BuiHealth>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiHealth, BuiSlider },
    setup() {
      const h1 = ref<number[]>([1])
      const h2 = ref<number[]>([3])
      const h3 = ref<number[]>([1])

      const health1 = computed(() => {
        return [
          { id: 'Running', class: 'bg-green-500 after:bg-green-500', count: h1.value[0] },
          { id: 'Info', class: 'bg-yellow-500 after:bg-yellow-500', count: h2.value[0] },
          { id: 'Error', class: 'bg-red-500 after:bg-red-500', count: h3.value[0] }
        ]
      })

      return { args, h1, h2, h3, health1 }
    },
    template: `
      <BuiHealth :model-value="health1" v-bind="args" />

      {{ h1[0] }}
      <BuiSlider v-model="h1" :step="1" :max="50" class="max-w-[300px]" />

      {{ h2[0] }}
      <BuiSlider v-model="h2" :step="1" :max="50" class="max-w-[300px]" />

      {{ h3[0] }}
      <BuiSlider v-model="h3" :step="1" :max="50" class="max-w-[300px]" />
    `
  })
}
