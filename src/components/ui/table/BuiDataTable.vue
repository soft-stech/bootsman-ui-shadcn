<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel
} from '@tanstack/vue-table'

import {
  BuiTable,
  BuiTableBody,
  BuiTableCell,
  BuiTableEmpty,
  BuiTableFooter,
  BuiTableHead,
  BuiTableHeader,
  BuiTableRow
} from './'

import {
  BuiPaginationFirst,
  BuiPagination,
  BuiPaginationPrev,
  BuiPaginationListItem,
  BuiPaginationEllipsis,
  BuiPaginationNext,
  BuiPaginationLast,
  BuiPaginationList
} from '@/components/ui/pagination'
import { BuiButton } from '@/components/ui/button'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
  }>(),
  { pageSize: 10 }
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
  getPaginationRowModel: getPaginationRowModel()
})
</script>

<template>
  <BuiTable>
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
    <BuiTableFooter v-if="table.getPageCount()">
      <BuiTableRow>
        <BuiTableCell :colspan="columns.length">
          <BuiPagination
            v-slot="{ page }"
            :total="table.getFilteredRowModel().rows.length"
            :sibling-count="1"
            show-edges
            :itemsPerPage="table.getState().pagination.pageSize"
            :page="table.getState().pagination.pageIndex + 1"
          >
            <BuiPaginationList v-slot="{ items }" class="flex items-center justify-center gap-1">
              <BuiPaginationFirst @click="table.setPageIndex(0)" />
              <BuiPaginationPrev @click="table.previousPage()" />

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
                    @click="table.setPageIndex(item.value - 1)"
                  >
                    {{ item.value }}
                  </BuiButton>
                </BuiPaginationListItem>
                <BuiPaginationEllipsis v-else :key="item.type" :index="index" />
              </template>

              <BuiPaginationNext @click="table.nextPage()" />
              <BuiPaginationLast @click="table.setPageIndex(table.getPageCount() - 1)" />
            </BuiPaginationList>
          </BuiPagination>
        </BuiTableCell>
      </BuiTableRow>
    </BuiTableFooter>
  </BuiTable>
</template>
