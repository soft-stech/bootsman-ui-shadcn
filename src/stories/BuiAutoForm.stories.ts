import { BuiAutoForm } from '@/components/auto-form'
import BuiAutoFormStory from '@/stories/components/BuiAutoFormStory.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  // @ts-expect-error no need to describe all args, see BuiAutoFormStory
  component: BuiAutoForm,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiAutoForm>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-expect-error no need to describe all args, see BuiAutoFormStory
  args: {},
  render: (args) => ({
    components: { BuiAutoFormStory },
    setup() {
      return { args }
    },
    template: `<BuiAutoFormStory v-bind="args" />`
  })
}
