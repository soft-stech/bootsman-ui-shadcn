<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

import {
  BuiTable,
  BuiTableBody,
  BuiTableCell,
  BuiTableEmpty,
  BuiTableHead,
  BuiTableHeader,
  BuiTableRow
} from './'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel()
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
  </BuiTable>
</template>
