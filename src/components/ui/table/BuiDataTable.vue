<script setup lang="ts" generic="TData, TValue">
import {
  BuiCollapsible,
  BuiCollapsibleContent,
  BuiCollapsibleTrigger
} from '@/components/ui/collapsible'
import { BuiPaginationCommon, type PageSize } from '@/components/ui/pagination'
import BuiTableRowSubrow from '@/components/ui/table/BuiTableRowSubrow.vue'
import { valueUpdater, cn } from '@/lib/utils'
import type {
  Column,
  ColumnDef,
  ColumnOrderState,
  ColumnSizingState,
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
import { computed, watchEffect, ref, watch } from 'vue'
import {
  BuiTable,
  BuiTableBody,
  BuiTableCell,
  BuiTableEmpty,
  BuiTableHead,
  BuiTableHeader,
  BuiTableRow,
  getPinningStyle,
  BuiDataTableColumnList
} from './'
import {
  BuiCommand,
  BuiCommandEmpty,
  BuiCommandInput,
  BuiCommandList
} from '@/components/ui/command'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/ui/popover'
import { BuiScrollArea } from '@/components/ui/scroll-area'
import { BuiButton } from '@/components/ui/button'
import { Settings2Icon } from 'lucide-vue-next'

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
    freezeHeader?: boolean
    columnSearchPlaceholder?: string
    columnSearchNotFound?: string
  }>(),
  {
    pageSize: 10,
    showPagination: true,
    manualPagination: true,
    manualSorting: true,
    totalItems: 0,
    columnSearchPlaceholder: 'Column name',
    columnSearchNotFound: 'Not found'
  }
)

const sorting = defineModel<SortingState>('sorting')
const pagination = defineModel<PaginationState>('pagination')
const rowSelection = defineModel<RowSelectionState>('selection')
const columnVisibility = defineModel<VisibilityState>('columnVisibility')
const columnSizing = defineModel<ColumnSizingState>('columnSizing')
const columnOrder = defineModel<ColumnOrderState>('columnOrder')
const computedItems = computed(() =>
  props.manualPagination ? props.totalItems : props.data.length
)
const pinnedColumns = props.columns
  .map((col) => (col.meta?.pinLeft && col.id ? col.id : ''))
  .filter(Boolean)

const table = useVueTable({
  initialState: {
    // TODO: column freeze
    columnPinning: { left: pinnedColumns },
    pagination: { pageSize: props.pageSize }
  },
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
  onColumnVisibilityChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, columnVisibility)
  },
  onColumnSizingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, columnSizing)
  },
  onColumnOrderChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, columnOrder)
  },
  autoResetPageIndex: false,
  manualPagination: props.manualPagination, // set to false to enable client-side pagination
  manualSorting: props.manualSorting,
  enableColumnResizing: true,
  columnResizeMode: 'onChange',
  columnResizeDirection: 'ltr',
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
    },
    get columnSizing() {
      return columnSizing.value
    },
    get columnOrder() {
      return columnOrder.value
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

const columnsList = ref<Column<TData, unknown>[]>(
  table
    .getAllColumns()
    .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
    .sort((a, b) => {
      if (!columnOrder.value) return 0
      else if (columnOrder.value?.indexOf(a.id) < 0 && columnOrder.value?.indexOf(b.id) >= 0)
        return 1
      else if (columnOrder.value?.indexOf(a.id) >= 0 && columnOrder.value?.indexOf(b.id) < 0)
        return -1
      else return columnOrder.value?.indexOf(a.id) - columnOrder.value?.indexOf(b.id)
    })
)
const columnsListIds = computed(() => columnsList.value.map((col) => col.id))
const open = ref(false)
const searchColumn = ref('')

const tableHeaders = computed(() =>
  table.getHeaderGroups().length > 0 ? table.getHeaderGroups()[0].headers : undefined
)

watch(columnsListIds, () => {
  table.setColumnOrder(columnsListIds.value)
})
</script>

<template>
  <div v-if="$slots.caption" class="w-full py-3">
    <slot name="caption" :table="table" />
  </div>
  <BuiTable>
    <template #columnVisibility>
      <BuiPopover v-model:open="open">
        <BuiPopoverTrigger as-child>
          <div class="absolute right-0 top-0 z-10 h-10 bg-background">
            <div
              class="flex h-full items-center border-l border-border/[0.16] bg-foreground/[0.04] px-1"
            >
              <BuiButton
                variant="ghost"
                class="flex h-8 w-8 items-center justify-center text-foreground"
              >
                <Settings2Icon class="h-4 w-4 flex-shrink-0 opacity-50" />
              </BuiButton>
            </div>
          </div>
        </BuiPopoverTrigger>
        <BuiPopoverContent class="w-[250px] p-0" align="start">
          <BuiCommand>
            <BuiCommandInput
              :placeholder="columnSearchPlaceholder"
              v-model="searchColumn"
              @input="(event) => (searchColumn = event.target.value)"
            />
            <BuiCommandList>
              <BuiScrollArea class="h-[300px]">
                <BuiCommandEmpty>{{ columnSearchNotFound }}</BuiCommandEmpty>
                <BuiDataTableColumnList
                  v-model:columns-list="columnsList as Column<TData, unknown>[]"
                />
              </BuiScrollArea>
            </BuiCommandList>
          </BuiCommand>
        </BuiPopoverContent>
      </BuiPopover>
    </template>
    <BuiTableHeader v-if="tableHeaders" :freeze-header="props.freezeHeader">
      <BuiTableHead
        v-for="header in tableHeaders"
        :key="header.id"
        :style="{ ...getPinningStyle(header.column), width: header.getSize() + 'px' }"
        :freeze-header="props.freezeHeader"
      >
        <FlexRender
          v-if="!header.isPlaceholder"
          :render="header.column.columnDef.header"
          :props="header.getContext()"
        />
        <div
          @dblclick="() => header.column.resetSize()"
          @mousedown="header.getResizeHandler()?.($event)"
          :className="
            cn(
              'absolute top-0 right-0 h-full w-1 bg-muted-foreground opacity-0 cursor-col-resize select-none touch-none hover:opacity-50',
              header.column.getIsResizing() ? 'bg-primary opacity-50' : ''
            )
          "
        />
      </BuiTableHead>
    </BuiTableHeader>
    <BuiTableBody>
      <template v-if="table.getRowModel().rows?.length">
        <template v-if="props.groupBy && groupedRows">
          <BuiCollapsible asChild v-for="(value, key) in groupedRows" :key="key" :open="true">
            <BuiCollapsibleTrigger asChild>
              <BuiTableRow class="bg-foreground/[0.04]">
                <BuiTableCell :colspan="columns.length" class="!pb-0">
                  <div class="mt-1 flex w-full items-center justify-between">
                    <div
                      class="relative -mb-[6px] inline-block rounded-t-lg bg-background px-4 py-2 text-sm font-medium shadow-top-shadow"
                    >
                      <div class="absolute -left-2 bottom-0 h-2 w-2 bg-background"></div>
                      <div class="absolute -left-4 bottom-0 h-4 w-4 rounded-lg bg-background"></div>
                      <div
                        class="absolute -left-4 bottom-0 h-4 w-4 rounded-lg bg-foreground/[0.04]"
                      ></div>
                      <div class="absolute -right-2 bottom-0 h-2 w-2 bg-background"></div>
                      <div
                        class="absolute -right-4 bottom-0 h-4 w-4 rounded-lg bg-background"
                      ></div>
                      <div
                        class="absolute -right-4 bottom-0 h-4 w-4 rounded-lg bg-foreground/[0.04]"
                      ></div>
                      <div></div>
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
                <template #actions>
                  <slot name="groupActions" :group="key" />
                </template>
              </BuiTableRow>
            </BuiCollapsibleTrigger>
            <BuiCollapsibleContent asChild>
              <template v-for="row in value" :key="row.id">
                <BuiTableRowSubrow
                  :columns="props.columns"
                  :row="row"
                  :renderSubComponent="props.renderSubComponent"
                >
                  <template #actions>
                    <slot name="rowActions" :row="row.original" />
                  </template>
                </BuiTableRowSubrow>
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
            >
              <template #actions>
                <slot name="rowActions" :row="row.original" />
              </template>
            </BuiTableRowSubrow>
          </template>
        </template>
      </template>
      <template v-else>
        <BuiTableEmpty :colspan="columns.length">
          <slot name="nodata">No data</slot>
        </BuiTableEmpty>
      </template>
    </BuiTableBody>
  </BuiTable>
  <div
    v-if="showPagination && computedItems > 0"
    class="flex w-full justify-end border-x border-b border-border/[0.16] bg-primary/[0.04] px-4 py-1 text-base text-muted-foreground"
  >
    <BuiPaginationCommon
      :total="computedItems"
      v-model:pageIndex="pageIndex"
      v-model:pageSize="tablePageSize"
    >
    </BuiPaginationCommon>
  </div>
</template>
