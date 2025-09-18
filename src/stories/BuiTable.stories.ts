import type { Meta, StoryObj } from '@storybook/vue3-vite'

import {
  BuiTable,
  BuiTableBody,
  BuiTableCaption,
  BuiTableCell,
  BuiTableEmpty,
  BuiTableHead,
  BuiTableHeader,
  BuiTableRow,
  BuiTableFooter
} from '@/components/table'
import { BuiButton } from '@/components/button'

const meta = {
  component: BuiTable,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiTable>
export default meta

type Story = StoryObj<typeof meta>

export const Table: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiTable,
      BuiTableCaption,
      BuiTableHeader,
      BuiTableRow,
      BuiTableHead,
      BuiTableBody,
      BuiTableCell,
      BuiButton,
      BuiTableEmpty,
      BuiTableFooter
    },
    setup() {
      return { args }
    },
    template: `
      <BuiTable>
        <BuiTableCaption><BuiButton variant="outline">Download YAML</BuiButton></BuiTableCaption>
        <BuiTableHeader>
          <BuiTableRow>
            <BuiTableHead class="w-[100px]"> Invoice </BuiTableHead>
            <BuiTableHead>Status</BuiTableHead>
            <BuiTableHead>Method</BuiTableHead>
            <BuiTableHead> Amount </BuiTableHead>
          </BuiTableRow>
        </BuiTableHeader>
        <BuiTableBody>
          <BuiTableRow>
            <BuiTableCell class="font-medium"> INV001 </BuiTableCell>
            <BuiTableCell>Paid</BuiTableCell>
            <BuiTableCell>Credit Card</BuiTableCell>
            <BuiTableCell> $250.00 </BuiTableCell>
          </BuiTableRow>
          <BuiTableRow>
            <BuiTableCell class="font-medium"> INV002 </BuiTableCell>
            <BuiTableCell>Paid</BuiTableCell>
            <BuiTableCell>Credit Card</BuiTableCell>
            <BuiTableCell> $50.00 </BuiTableCell>
          </BuiTableRow>
        </BuiTableBody>
        <BuiTableFooter>
          <BuiTableRow>
            <BuiTableCell :colspan="4"
              >ProTip: Paste one or more lines of key=value pairs into any key field for easy bulk
              entry
            </BuiTableCell>
          </BuiTableRow>
        </BuiTableFooter>
      </BuiTable>
    `
  })
}

export const Empty: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiTable,
      BuiTableHeader,
      BuiTableRow,
      BuiTableHead,
      BuiTableBody,
      BuiTableEmpty
    },
    setup() {
      return { args }
    },
    template: `
      <BuiTable>
        <BuiTableHeader>
          <BuiTableRow>
            <BuiTableHead class="w-[100px]"> Invoice </BuiTableHead>
            <BuiTableHead>Status</BuiTableHead>
            <BuiTableHead>Method</BuiTableHead>
            <BuiTableHead>Amount</BuiTableHead>
          </BuiTableRow>
        </BuiTableHeader>
        <BuiTableBody>
          <BuiTableEmpty :colspan="4">No data</BuiTableEmpty>
        </BuiTableBody>
      </BuiTable>
    `
  })
}

export const HorizontalScroll: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiTable,
      BuiTableHeader,
      BuiTableRow,
      BuiTableHead,
      BuiTableBody,
      BuiTableCell
    },
    setup() {
      return { args }
    },
    template: `
      <BuiTable>
        <BuiTableHeader>
          <BuiTableRow>
            <BuiTableHead class="w-[400px]">Invoice</BuiTableHead>
            <BuiTableHead class="w-[400px]">Status</BuiTableHead>
            <BuiTableHead class="w-[400px]">Method</BuiTableHead>
            <BuiTableHead class="w-[400px]">Amount</BuiTableHead>
          </BuiTableRow>
        </BuiTableHeader>
        <BuiTableBody class="[&_td]:whitespace-nowrap">
          <BuiTableRow>
            <BuiTableCell class="font-medium"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell
            >
            <BuiTableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell>
            <BuiTableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell>
            <BuiTableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell>
          </BuiTableRow>
          <BuiTableRow>
            <BuiTableCell class="font-medium"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell
            >
            <BuiTableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell>
            <BuiTableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell>
            <BuiTableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</BuiTableCell>
          </BuiTableRow>
        </BuiTableBody>
      </BuiTable>
    `
  })
}
