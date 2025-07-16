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
import { computed, watchEffect, ref, watch, onMounted, onBeforeMount, onUnmounted } from 'vue'
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
  BuiCommandList,
  BuiCommandItem
} from '@/components/ui/command'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/ui/popover'
import { BuiScrollArea } from '@/components/ui/scroll-area'
import { BuiButton } from '@/components/ui/button'
import { Settings2Icon } from 'lucide-vue-next'
import { useElementSize } from '@vueuse/core'

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
    enableColumnListControl?: boolean
    enableColumnResizing?: boolean
    columnSearchPlaceholder?: string
    columnSearchNotFound?: string
    columnResetVisibility?: string
    paginationTranslations?: {
      itemsPerPage: string
      page: string
      of: string
    }
  }>(),
  {
    pageSize: 10,
    showPagination: true,
    manualPagination: true,
    manualSorting: true,
    totalItems: 0,
    columnSearchPlaceholder: 'Column name',
    columnSearchNotFound: 'Not found',
    columnResetVisibility: 'Reset column visibility',
    enableColumnResizing: true
  }
)

const sorting = defineModel<SortingState>('sorting')
const pagination = defineModel<PaginationState>('pagination')
const rowSelection = defineModel<RowSelectionState>('selection')
const columnVisibility = defineModel<VisibilityState>('columnVisibility')
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
  onColumnOrderChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, columnOrder)
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
const allVisibleColumns = computed(() =>
  columnsListIds.value.reduce<VisibilityState>((acc, id) => {
    return { ...acc, [id]: true }
  }, {})
)
const open = ref(false)
const searchColumn = ref('')

const tableHeaders = computed(() =>
  table.getHeaderGroups().length > 0 ? table.getHeaderGroups()[0].headers : undefined
)

watch(columnsListIds, () => {
  table.setColumnOrder(columnsListIds.value)
})

const tableHeaderRef = ref<InstanceType<typeof BuiTableHeader> | null>(null)
const { height, width } = useElementSize(tableHeaderRef)

const getCells = () => {
  if (tableHeaderRef.value && tableHeaderRef.value.headRef) {
    const headerCells = [...tableHeaderRef.value.headRef.querySelectorAll('th')]
    const headerCellsWidths: {
      [key: string]: { cell: HTMLTableCellElement; initialWidth: number }
    } = headerCells.reduce((acc, cell) => {
      const cellId = cell.id.split('_')[0]
      return {
        ...acc,
        [cellId]: {
          cell: cell,
          initialWidth: cell.offsetWidth
        }
      }
    }, {})

    return headerCellsWidths
  }

  return undefined
}

const isResizing = ref<boolean>(false)
const resizingCellId = ref<string>('')
const neighborCellId = ref<string>('')
const cells = ref<
  | {
      [key: string]: { cell: HTMLTableCellElement; initialWidth: number }
    }
  | undefined
>(undefined)
const minCellWidth = ref<number>(90)

const handleResizeControlMouseDown = (e: MouseEvent, cellId: string) => {
  isResizing.value = true
  resizingCellId.value = cellId

  if (cells.value) {
    const resizingCell = cells.value[cellId].cell
    let neighborCell = resizingCell.nextElementSibling as HTMLTableCellElement

    if (!neighborCell) {
      neighborCell = resizingCell.previousElementSibling as HTMLTableCellElement
    }

    neighborCellId.value = neighborCell ? neighborCell.id.split('_')[0] : ''

    document.addEventListener('mousemove', handleCellResize)
  }
}

const handleResizeControlMouseUp = (e: MouseEvent) => {
  if (!isResizing.value) return

  isResizing.value = false
  resizingCellId.value = ''
  neighborCellId.value = ''
  document.removeEventListener('mousemove', handleCellResize)

  if (cells.value) {
    for (let cell in cells.value) {
      const newWidth =
        cells.value[cell].cell.offsetWidth < minCellWidth.value
          ? minCellWidth.value
          : cells.value[cell].cell.offsetWidth
      cells.value[cell].cell.style.width = newWidth + 'px'
    }
  }
}

const resizeCells = (
  cell: HTMLTableCellElement,
  neighborCell: HTMLTableCellElement,
  e: MouseEvent
) => {
  if (!cell || !neighborCell) {
    resizingCellId.value = ''
    neighborCellId.value = ''

    return
  }

  const newCellWidth = parseInt(cell.style.width) + e.movementX
  const newNeighborCellWidth = parseInt(neighborCell.style.width) - e.movementX

  const direction: 'left' | 'right' = e.movementX < 0 ? 'left' : 'right'

  if (direction === 'left') {
    if (Math.floor(newCellWidth) <= minCellWidth.value) {
      const nextCell = cell.previousElementSibling as HTMLTableCellElement

      resizeCells(nextCell, neighborCell, e)
    }
  } else {
    if (Math.floor(newNeighborCellWidth) <= minCellWidth.value) {
      const nextNeighborCell = neighborCell.nextElementSibling as HTMLTableCellElement

      resizeCells(cell, nextNeighborCell, e)
    }
  }

  cell.style.width = newCellWidth + 'px'
  neighborCell.style.width = newNeighborCellWidth + 'px'
}

const handleCellResize = (e: MouseEvent) => {
  if (!props.enableColumnResizing) return

  e.preventDefault()

  if (cells.value) {
    const resizingCell = cells.value[resizingCellId.value]?.cell
    const neighborCell = cells.value[neighborCellId.value]?.cell

    resizeCells(resizingCell, neighborCell, e)
  }
}

const resetCells = () => {
  if (cells.value) {
    for (let cell in cells.value) {
      cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
    }
  }
}

onBeforeMount(() => {
  document.addEventListener('mouseup', handleResizeControlMouseUp)
})

onMounted(() => {
  cells.value = getCells()

  if (cells.value) {
    for (let cell in cells.value) {
      if (!cells.value[cell].cell.style.width) {
        cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
      }
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('mouseup', handleResizeControlMouseUp)
})
</script>

<template>
  <div v-if="$slots.caption" class="w-full py-3">
    <slot name="caption" :table="table" />
  </div>
  <div>table header width {{ width }}</div>
  <div>isResizing {{ isResizing }}</div>
  <div>resizing cell id {{ resizingCellId }}</div>
  <div>neighbor cell id {{ neighborCellId }}</div>
  <BuiTable>
    <template v-if="enableColumnListControl" #columnVisibility>
      <BuiPopover v-model:open="open">
        <BuiPopoverTrigger as-child>
          <div
            class="absolute right-0 top-0 z-10 bg-background"
            :style="{ height: `${height.toFixed(1)}px` }"
          >
            <div
              class="flex h-full items-center border-b border-l border-border/[0.16] bg-foreground/[0.04] px-1"
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
              @input="
                (event: InputEvent) => (searchColumn = (event.target as HTMLInputElement)?.value)
              "
            />
            <BuiCommandList>
              <BuiScrollArea class="h-[300px]">
                <BuiCommandEmpty>{{ columnSearchNotFound }}</BuiCommandEmpty>
                <BuiDataTableColumnList
                  v-model:columns-list="columnsList as Column<TData, unknown>[]"
                />
                <BuiCommandItem
                  value="reset_columns_visibility"
                  class="px-2 py-1.5 font-medium text-muted-foreground"
                  @select="table.setColumnVisibility({ ...columnVisibility, ...allVisibleColumns })"
                >
                  {{ columnResetVisibility }}
                </BuiCommandItem>
              </BuiScrollArea>
            </BuiCommandList>
          </BuiCommand>
        </BuiPopoverContent>
      </BuiPopover>
    </template>
    <BuiTableHeader v-if="tableHeaders" :freeze-header="props.freezeHeader" ref="tableHeaderRef">
      <BuiTableHead
        v-for="(header, index) in tableHeaders"
        :key="header.id"
        :id="`${header.id}_cell`"
        :style="{
          ...getPinningStyle(header.column)
        }"
        :freeze-header="props.freezeHeader"
      >
        <FlexRender
          v-if="!header.isPlaceholder"
          :render="header.column.columnDef.header"
          :props="header.getContext()"
        />
        <div
          v-if="enableColumnResizing && index < tableHeaders.length - 1"
          @dblclick="resetCells"
          @mousedown="(e: MouseEvent) => handleResizeControlMouseDown(e, header.id)"
          :className="
            cn(
              'absolute top-0 right-0 h-full w-1 bg-muted-foreground opacity-0 cursor-col-resize select-none touch-none hover:opacity-50',
              isResizing && resizingCellId === header.id ? 'bg-primary opacity-50' : ''
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
    v-if="(showPagination || $slots.numberOfItems) && computedItems > 0"
    class="flex w-full border-x border-b border-border/[0.16] bg-primary/[0.04] px-2.5 py-1 text-sm text-muted-foreground"
    :class="{
      'justify-between': showPagination && $slots.numberOfItems,
      'justify-start': $slots.numberOfItems && !showPagination,
      'justify-end': showPagination && !$slots.numberOfItems
    }"
  >
    <div v-if="$slots.numberOfItems" class="flex min-h-8 items-center">
      <slot name="numberOfItems"></slot>
    </div>
    <BuiPaginationCommon
      v-if="showPagination"
      :total="computedItems"
      v-model:pageIndex="pageIndex"
      v-model:pageSize="tablePageSize"
      :translations="paginationTranslations"
    >
    </BuiPaginationCommon>
  </div>
</template>
