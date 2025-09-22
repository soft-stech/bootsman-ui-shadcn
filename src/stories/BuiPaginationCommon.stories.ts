import { BuiPaginationCommon, type PageSize } from '@/components/pagination'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta = {
  component: BuiPaginationCommon,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiPaginationCommon>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-expect-error no need to describe all args, see BuiPaginationCommon
  args: {},
  render: (args) => ({
    components: { BuiPaginationCommon },
    setup() {
      const pageIndex = ref(1)
      const pageSize = ref<PageSize>(10)
      return { args, pageIndex, pageSize }
    },
    template: `
      <BuiPaginationCommon
        class="float-right"
        :total="100"
        v-model:pageIndex="pageIndex"
        v-model:pageSize="pageSize"
      >
      </BuiPaginationCommon>
    `
  })
}
