import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiPagination,
  BuiPaginationEllipsis,
  BuiPaginationFirst,
  BuiPaginationLast,
  BuiPaginationList,
  BuiPaginationListItem,
  BuiPaginationNext,
  BuiPaginationPrev
} from '@/components/pagination'
import { BuiButton } from '@/components/button'

const meta = {
  component: BuiPagination,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    itemsPerPage: 10,
    siblingCount: 1,
    defaultPage: 2,
    showEdges: true,
    total: 100
  }
} satisfies Meta<typeof BuiPagination>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      BuiPagination,
      BuiButton,
      BuiPaginationFirst,
      BuiPaginationLast,
      BuiPaginationNext,
      BuiPaginationPrev,
      BuiPaginationList,
      BuiPaginationListItem,
      BuiPaginationEllipsis
    },
    setup() {
      return { args }
    },
    template: `
      <BuiPagination
        v-slot="{ page }"
        v-bind="args"
      >
        <BuiPaginationList v-slot="{ items }" class="flex items-center gap-1">
          <BuiPaginationFirst />
          <BuiPaginationPrev />

          <template v-for="(item, index) in items">
            <BuiPaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <BuiButton
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </BuiButton>
            </BuiPaginationListItem>
            <BuiPaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <BuiPaginationNext />
          <BuiPaginationLast />
        </BuiPaginationList>
      </BuiPagination>
    `
  })
}
