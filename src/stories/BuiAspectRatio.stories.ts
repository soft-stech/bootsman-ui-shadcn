import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BuiAspectRatio from '@/components/aspect-ratio/BuiAspectRatio.vue'

const meta = {
  component: BuiAspectRatio,
  tags: ['autodocs'],
  args: {
    ratio: 16 / 9,
    class: 'bg-muted'
  }
} satisfies Meta<typeof BuiAspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiAspectRatio },
    setup() {
      return { args }
    },
    template: `
      <BuiAspectRatio v-bind="args">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="h-full w-full rounded-md object-cover"
        />
      </BuiAspectRatio>
    `
  })
}
