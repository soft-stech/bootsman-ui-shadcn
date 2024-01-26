<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
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
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
  }>(),
  { pageSize: 10 }
)

const sorting = ref<SortingState>([])
const rowSelection = ref({})

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
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value
    },
    get rowSelection() {
      return rowSelection.value
    }
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
    <BuiTableFooter v-if="table.getPageCount() > 1">
      <BuiTableRow>
        <BuiTableCell :colspan="columns.length">
          <BuiPaginationCommon
            class="float-right"
            :total="table.getFilteredRowModel().rows.length"
            :pageIndex="table.getState().pagination.pageIndex"
            :pageSize="table.getState().pagination.pageSize as PageSize"
            :setPageIndex="(v) => table.setPageIndex(v)"
            :setPageSize="
              (v) => {
                table.setPageSize(v)
                table.setPageIndex(0)
              }
            "
          >
          </BuiPaginationCommon>
        </BuiTableCell>
      </BuiTableRow>
    </BuiTableFooter>
  </BuiTable>
</template>
