import { BuiDataTable } from '@/components/table'
import BuiDataTableStory from '@/stories/components/BuiDataTableStory.vue'
import BuiDataTableWithScrollStory from '@/stories/components/BuiDataTableWithScrollStory.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  // @ts-expect-error no need to describe all args, see BuiDataTableStory
  component: BuiDataTable,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiDataTable>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-expect-error no need to describe all args, see BuiDataTableStory
  args: {},
  render: (args) => ({
    components: { BuiDataTableStory },
    setup() {
      return { args }
    },
    template: `<BuiDataTableStory v-bind="args" />`
  })
}

export const WithScroll: Story = {
  // @ts-expect-error no need to describe all args, see BuiDataTableStory
  args: {},
  render: (args) => ({
    components: { BuiDataTableWithScrollStory },
    setup() {
      return { args }
    },
    template: `<BuiDataTableWithScrollStory v-bind="args" />`
  })
}
