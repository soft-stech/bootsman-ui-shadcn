<script setup lang="ts" generic="TData, TValue">
import {
  BuiCollapsible,
  BuiCollapsibleContent,
  BuiCollapsibleTrigger
} from '@/components/ui/collapsible'
import { BuiPaginationCommon, type PageSize } from '@/components/ui/pagination'
import BuiTableRowSubrow from '@/components/ui/table/BuiTableRowSubrow.vue'
import { valueUpdater } from '@/lib/utils'
import type {
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { computed, watchEffect } from 'vue'
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

const NO_GROUP_KEY = '#UNDEFINED#'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
    showPagination?: boolean
    totalItems?: number
    manualPagination?: boolean
    manualSorting?: boolean
    groupBy?: keyof TData
    groupLabels?: { [key in keyof TData]?: string[] }
    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
    renderSubComponent?: (row: Row<TData>) => (() => any) | undefined
  }>(),
  { pageSize: 10, showPagination: true, manualPagination: true, manualSorting: true, totalItems: 0 }
)

const sorting = defineModel<SortingState>('sorting')
const pagination = defineModel<PaginationState>('pagination')
const rowSelection = defineModel<RowSelectionState>('selection')
const columnVisibility = defineModel<VisibilityState>('columnVisibility')
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
  autoResetPageIndex: false,
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
    },
    get columnVisibility() {
      return columnVisibility.value
    }
  },
  getRowId: props.getRowId
})

const tablePageSize = computed<PageSize>({
  get() {
    return table.getState().pagination.pageSize as PageSize
  },
  set(size: PageSize) {
    if (!pagination.value) return
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
    if (!pagination.value) return
    pagination.value.pageIndex = index - 1
    table.setPageIndex(index - 1)
  }
})

watchEffect(() => {
  const totalPages = table.getPageCount()
  if (totalPages && totalPages < pageIndex.value) {
    pageIndex.value = totalPages
  }
})

const groupedRows = computed<{ [key: string]: Row<TData>[] }>(() => {
  if (!props.groupBy) return null

  return table.getRowModel().rows.reduce((acc, row) => {
    const value = row.getValue(props.groupBy! as string)
    const col = (value ?? NO_GROUP_KEY) as string
    acc[col] = acc[col] || []
    acc[col].push(row)
    return acc
  }, Object.create(null))
})

function getGroupLabel(index: number) {
  const labels = props.groupBy && props.groupLabels ? props.groupLabels[props.groupBy] || [] : []
  return labels[index]
}
</script>

<template>
  <div v-if="$slots.caption" class="w-full py-4">
    <slot name="caption" :table="table" />
  </div>
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
        <template v-if="props.groupBy && groupedRows">
          <BuiCollapsible asChild v-for="(value, key) in groupedRows" :key="key" :open="true">
            <BuiCollapsibleTrigger asChild>
              <BuiTableRow class="bg-foreground/[0.04]">
                <BuiTableCell :colspan="columns.length" class="!pb-0">
                  <div class="flex w-full items-center justify-between">
                    <div class="inline-block rounded-t bg-background px-4 py-3">
                      <template v-if="key === NO_GROUP_KEY">
                        {{ getGroupLabel(1) }}
                      </template>
                      <template v-else>
                        {{ getGroupLabel(0) }}:
                        <slot v-if="$slots.groupName" name="groupName" :group="key" />
                        <template v-else>
                          {{ key }}
                        </template>
                      </template>
                    </div>
                    <slot v-if="$slots.groupByRow" name="groupByRow" :group="key" />
                  </div>
                </BuiTableCell>
              </BuiTableRow>
            </BuiCollapsibleTrigger>
            <BuiCollapsibleContent asChild>
              <template v-for="row in value" :key="row.id">
                <BuiTableRowSubrow
                  :columns="props.columns"
                  :row="row"
                  :renderSubComponent="props.renderSubComponent"
                />
              </template>
            </BuiCollapsibleContent>
          </BuiCollapsible>
        </template>

        <template v-else>
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <BuiTableRowSubrow
              :columns="props.columns"
              :row="row"
              :renderSubComponent="props.renderSubComponent"
            />
          </template>
        </template>
      </template>
      <template v-else>
        <BuiTableEmpty :colspan="columns.length">
          <slot name="nodata">No data</slot>
        </BuiTableEmpty>
      </template>
    </BuiTableBody>
    <BuiTableFooter v-if="showPagination && computedItems > 0">
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
