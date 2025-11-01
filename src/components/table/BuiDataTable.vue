<script setup lang="ts" generic="TData, TValue">
import {
  BuiCollapsible,
  BuiCollapsibleContent,
  BuiCollapsibleTrigger
} from '@/components/collapsible'
import { BuiPaginationCommon, type PageSize } from '@/components/pagination'
import BuiTableRowSubrow from '@/components/table/BuiTableRowSubrow.vue'
import type {
  Column,
  ColumnDef,
  ColumnOrderState,
  Header,
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
import { computed, watchEffect, ref, watch, onMounted, onBeforeMount, nextTick } from 'vue'
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
  BuiCommandItem,
  BuiCommandSeparator
} from '@/components/command'
import { BuiContextMenuContent, BuiContextMenuItem } from '@/components/context-menu'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/popover'
import { BuiScrollArea } from '@/components/scroll-area'
import { BuiButton } from '@/components/button'
import { Settings2Icon, ChevronDown } from 'lucide-vue-next'
import { useElementSize, useEventListener } from '@vueuse/core'
import { isEqual } from 'lodash-es'
import { cn, valueUpdater } from '@/lib/utils'
import { useResizeColumns } from '@/lib/useResizeColumns'
import { useSessionStorage } from '@vueuse/core'

const NO_GROUP_KEY = '#UNDEFINED#'
const defaultColumnContextMenuTranslations = {
  hideColumn: 'Hide column',
  resetSize: 'Reset size',
  sortAsc: 'Sort ascending',
  sortDesc: 'Sort descending'
}

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
    renderSubComponent?: (row: Row<TData>) => (() => unknown) | undefined
    freezeHeader?: boolean
    enableColumnListControl?: boolean
    enableColumnResizing?: boolean
    enableGroupFolding?: boolean
    columnSearchPlaceholder?: string
    columnSearchNotFound?: string
    columnResetVisibility?: string
    paginationTranslations?: {
      itemsPerPage: string
      page: string
      of: string
    }
    headerContextMenuTranslations?: {
      hideColumn?: string
      resetSize?: string
      sortAsc?: string
      sortDesc?: string
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
    enableColumnResizing: true,
    enableGroupFolding: true
  }
)

const sorting = defineModel<SortingState>('sorting')
const pagination = defineModel<PaginationState>('pagination')
const rowSelection = defineModel<RowSelectionState>('selection')
const columnVisibility = defineModel<VisibilityState>('columnVisibility')
const columnOrder = defineModel<ColumnOrderState>('columnOrder')
const columnSizing = defineModel<Record<string, number>>('columnSizing')
const computedItems = computed(() =>
  props.manualPagination ? props.totalItems : props.data.length
)
const pinnedColumns = props.columns
  .map((col) => ((col.meta as { pinLeft: boolean })?.pinLeft && col.id ? col.id : ''))
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
  onColumnVisibilityChange: async (updaterOrValue) => {
    valueUpdater(updaterOrValue, columnVisibility)

    await nextTick()

    resetCells()
    setInitialColumnWidths()
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
const { height } = useElementSize(tableHeaderRef)

const {
  tableHeaderElement,
  calculatedColumnSizing,
  isResizing,
  resizingCellId,
  resetCells,
  handleResizeControlMouseDown,
  handleResizeControlMouseUp,
  setInitialColumnWidths,
  setProvidedCellWidths
} = useResizeColumns()

onBeforeMount(() => {
  calculatedColumnSizing.value = columnSizing.value
})

onMounted(() => {
  if (tableHeaderRef.value) {
    tableHeaderElement.value = tableHeaderRef.value

    setProvidedCellWidths(columnSizing.value)
    setInitialColumnWidths()
  }

  groupsOpenStateInStorage.value = {}
})

watchEffect(() => {
  if (!isEqual(calculatedColumnSizing.value, columnSizing.value)) {
    columnSizing.value = calculatedColumnSizing.value
  }
})

useEventListener(document, 'mouseup', handleResizeControlMouseUp)

const getHeaderCellSortingButton = (header: Header<TData, unknown>) => {
  const currentHeaderCell = tableHeaderElement.value?.headRef?.querySelector(
    `th[id="${header.id}_cell"]`
  ) as HTMLTableCellElement | undefined

  return currentHeaderCell?.querySelector('button[sorting-enabled]')
}

type HeaderCellAction = 'hideColumn' | 'resetSize' | 'sortAsc' | 'sortDesc'
const availableHeaderCellActions = (header: Header<TData, unknown>) => {
  const out: HeaderCellAction[] = []

  if (props.manualSorting) {
    if (getHeaderCellSortingButton(header)) {
      out.push('sortAsc', 'sortDesc')
    }
  }

  if (props.enableColumnListControl && header.column.getCanHide()) {
    out.push('hideColumn')
  }

  if (props.enableColumnResizing) {
    out.push('resetSize')
  }

  return out
}
const onHeaderCellAction = (header: Header<TData, unknown>, action: HeaderCellAction) => {
  switch (action) {
    case 'hideColumn':
      header.column.toggleVisibility()
      break
    case 'resetSize':
      resetCells()
      break
    case 'sortAsc':
      header.column.toggleSorting(false)
      break
    case 'sortDesc':
      header.column.toggleSorting(true)
      break
    default:
      break
  }
}

const groupsOpenStateInStorage = useSessionStorage('tableGroups', {})
const groupsOpenStateRef = ref<Record<string, boolean>>(
  props.enableGroupFolding
    ? (groupsOpenStateInStorage.value ?? Object.create(null))
    : Object.create(null)
)

const handleGroupToggle = (value: boolean, key: string | number) => {
  groupsOpenStateInStorage.value = { ...groupsOpenStateRef.value, [key]: value }
}

watchEffect(() => {
  if (props.groupBy && groupedRows.value) {
    groupsOpenStateRef.value = Object.keys(groupedRows.value).reduce((acc, group) => {
      acc[group] = true
      return acc
    }, Object.create(null))

    if (props.enableGroupFolding && groupsOpenStateInStorage.value) {
      groupsOpenStateRef.value = { ...groupsOpenStateRef.value, ...groupsOpenStateInStorage.value }
    }
  } else {
    groupsOpenStateRef.value = Object.create(null)
  }
})

watch(
  () => props.enableGroupFolding,
  () => {
    if (!props.enableGroupFolding) {
      if (props.groupBy && groupedRows.value && groupsOpenStateRef.value) {
        Object.keys(groupsOpenStateRef.value).forEach(
          (group) => (groupsOpenStateRef.value![group] = true)
        )
      }
    } else {
      groupsOpenStateRef.value = { ...groupsOpenStateRef.value, ...groupsOpenStateInStorage.value }
    }
  }
)

const handleHeaderCellSorting = (header: Header<TData, unknown>) => {
  if (getHeaderCellSortingButton(header)) {
    header.column.toggleSorting(header.column.getIsSorted() === 'asc')
  }
}
</script>

<template>
  <div v-if="$slots.caption" class="w-full py-3">
    <slot name="caption" :table="table" />
  </div>
  <BuiTable>
    <template v-if="enableColumnListControl" #columnVisibility>
      <BuiPopover v-model:open="open">
        <BuiPopoverTrigger as-child>
          <div
            class="bg-background absolute top-0 right-0 z-10"
            :style="{ height: `${height.toFixed(1)}px` }"
          >
            <div
              class="border-border/16 bg-foreground/4 hover:bg-foreground/8 dark:hover:bg-accent/16 flex h-full items-center border-b border-l px-1"
            >
              <BuiButton
                variant="ghost"
                class="text-foreground/50 hover:text-primary flex h-8 w-8 items-center justify-center hover:bg-transparent"
              >
                <Settings2Icon class="h-4 w-4 shrink-0" />
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
                <BuiCommandSeparator class="my-1"></BuiCommandSeparator>
                <BuiCommandItem
                  value="reset_columns_visibility"
                  key="reset_columns_visibility"
                  class="text-muted-foreground px-2 py-1.5 font-medium"
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
          ...getPinningStyle(header.column),
          cursor: getHeaderCellSortingButton(header) ? 'pointer' : 'auto'
        }"
        :freeze-header="props.freezeHeader"
        :can-resize="header.column.getCanResize() ? true : undefined"
        @click="handleHeaderCellSorting(header)"
      >
        <FlexRender
          v-if="!header.isPlaceholder"
          :render="header.column.columnDef.header"
          :props="header.getContext()"
        />
        <div
          v-if="
            enableColumnResizing && index < tableHeaders.length - 1 && header.column.getCanResize()
          "
          @dblclick="resetCells"
          @mousedown="() => handleResizeControlMouseDown(header.id, props.enableColumnResizing)"
          :className="
            cn(
              'absolute top-0 right-0 h-full w-1 bg-muted-foreground opacity-0 cursor-col-resize select-none touch-none hover:opacity-50',
              isResizing && resizingCellId === header.id ? 'bg-primary opacity-50' : ''
            )
          "
        />
        <template #actions>
          <BuiContextMenuContent v-if="availableHeaderCellActions(header).length > 0">
            <BuiContextMenuItem
              v-for="(action, idx) in availableHeaderCellActions(header)"
              @click="onHeaderCellAction(header, action)"
              :key="idx"
            >
              {{
                headerContextMenuTranslations && headerContextMenuTranslations[action]
                  ? headerContextMenuTranslations[action]
                  : defaultColumnContextMenuTranslations[action]
              }}
            </BuiContextMenuItem>
          </BuiContextMenuContent>
        </template>
      </BuiTableHead>
    </BuiTableHeader>
    <BuiTableBody>
      <template v-if="table.getRowModel().rows?.length">
        <template v-if="props.groupBy && groupedRows && groupsOpenStateRef">
          <BuiCollapsible
            as-child
            :disabled="!enableGroupFolding"
            v-for="(value, key) in groupedRows"
            :key="key"
            v-model:open="groupsOpenStateRef[key]"
            @update:open="(value) => handleGroupToggle(value, key)"
          >
            <BuiTableRow class="bg-foreground/4 border-b-0">
              <BuiTableCell :colspan="columns.length" class="pb-0!">
                <BuiCollapsibleTrigger class="group w-full">
                  <div class="mt-1 flex w-full items-center justify-between">
                    <div class="flex flex-row justify-start gap-1">
                      <div
                        class="bg-background shadow-top relative inline-block rounded-t-lg px-6 py-2 text-sm font-medium"
                        :class="enableGroupFolding ? '-mb-[1px]' : '-mb-[6px]'"
                      >
                        <div class="bg-background absolute bottom-0 -left-2 h-2 w-2"></div>
                        <div
                          class="bg-background absolute bottom-0 -left-4 h-4 w-4 rounded-lg"
                        ></div>
                        <div
                          class="bg-foreground/4 absolute bottom-0 -left-4 h-4 w-4 rounded-lg"
                        ></div>
                        <div class="bg-background absolute -right-2 bottom-0 h-2 w-2"></div>
                        <div
                          class="bg-background absolute -right-4 bottom-0 h-4 w-4 rounded-lg"
                        ></div>
                        <div
                          class="bg-foreground/4 absolute -right-4 bottom-0 h-4 w-4 rounded-lg"
                        ></div>
                        <div></div>
                        <div class="flex flex-row items-center gap-2">
                          <div v-if="key === NO_GROUP_KEY">
                            {{ getGroupLabel(1) }}
                          </div>
                          <div v-else>
                            {{ getGroupLabel(0) }}:
                            <slot v-if="$slots.groupName" name="groupName" :group="key" />
                            <template v-else>
                              {{ key }}
                            </template>
                          </div>
                          <div
                            v-if="enableGroupFolding"
                            class="bg-primary/8 hover:bg-primary/16 rounded-sm p-1 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          >
                            <ChevronDown :stroke-width="3" class="text-primary h-4 w-4 shrink-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <slot v-if="$slots.groupByRow" name="groupByRow" :group="key" />
                  </div>
                </BuiCollapsibleTrigger>
              </BuiTableCell>
              <template #actions>
                <slot name="groupActions" :group="key" />
              </template>
            </BuiTableRow>
            <BuiCollapsibleContent as-child>
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
    class="border-border/16 bg-primary/4 text-muted-foreground flex w-full border-x border-b px-2.5 py-1 text-sm"
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
