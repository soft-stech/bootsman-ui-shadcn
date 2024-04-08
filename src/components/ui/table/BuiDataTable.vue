<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  PaginationState,
  RowSelectionState,
  Row
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import {
  BuiTable,
  BuiTableBody,
  BuiTableCaption,
  BuiTableCell,
  BuiTableEmpty,
  BuiTableFooter,
  BuiTableHead,
  BuiTableHeader,
  BuiTableRow
} from './'
import { BuiPaginationCommon, type PageSize } from '@/components/ui/pagination'
import { valueUpdater } from '@/lib/utils'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
    showPagination?: boolean
    totalItems?: number
    manualPagination?: boolean
    manualSorting?: boolean
    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
  }>(),
  { pageSize: 10, showPagination: true, manualPagination: true, manualSorting: true, totalItems: 0 }
)

const sorting = defineModel<SortingState>('sorting')
const pagination = defineModel<PaginationState>('pagination')
const rowSelection = defineModel<RowSelectionState>('selection')
const computedItems = computed(() =>
  props.manualPagination ? props.totalItems : props.data.length
)
const table = useVueTable({
  initialState: { pagination: { pageSize: props.pageSize } },
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, sorting)
  },
  onPaginationChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, pagination)
  },
  onRowSelectionChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, rowSelection)
  },
  manualPagination: props.manualPagination, // set to false to enable client-side pagination
  manualSorting: props.manualSorting,
  state: {
    get sorting() {
      return sorting.value
    },
    get pagination() {
      return pagination.value
    },
    get rowSelection() {
      return rowSelection.value
    }
  },
  getRowId: props.getRowId
})

const tablePageSize = computed({
  get() {
    return table.getState().pagination.pageSize
  },
  set(size) {
    pagination.value.pageSize = size
    table.setPageSize(size)
    table.setPageIndex(0)
  }
})
const pageIndex = computed({
  get() {
    return table.getState().pagination.pageIndex + 1
  },
  set(index) {
    pagination.value.pageIndex = index - 1
    table.setPageIndex(index - 1)
  }
})
</script>

<template>
  <BuiTable>
    <BuiTableCaption v-if="$slots.caption"><slot name="caption" :table="table" /></BuiTableCaption>
    <BuiTableHeader>
      <BuiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <BuiTableHead v-for="header in headerGroup.headers" :key="header.id">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </BuiTableHead>
      </BuiTableRow>
    </BuiTableHeader>
    <BuiTableBody>
      <template v-if="table.getRowModel().rows?.length">
        <BuiTableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :data-state="row.getIsSelected() ? 'selected' : undefined"
        >
          <BuiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </BuiTableCell>
        </BuiTableRow>
      </template>
      <template v-else>
        <BuiTableEmpty :colspan="columns.length">No data</BuiTableEmpty>
      </template>
    </BuiTableBody>
    <BuiTableFooter v-if="showPagination && table.getPageCount()">
      <BuiTableRow>
        <BuiTableCell :colspan="columns.length">
          <BuiPaginationCommon
            class="float-right"
            :total="computedItems"
            v-model:pageIndex="pageIndex"
            v-model:pageSize="tablePageSize"
          >
          </BuiPaginationCommon>
        </BuiTableCell>
      </BuiTableRow>
    </BuiTableFooter>
  </BuiTable>
</template>
