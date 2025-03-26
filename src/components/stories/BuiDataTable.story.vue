<script setup lang="ts">
import { BuiDataTable } from '@/components/ui/table'
import RowActionsMenuContent from './components/ActionsMenuContent.vue'
import { BuiButton, BuiCheckbox, BuiTabs, BuiTabsList, BuiTabsTrigger } from '@/index'
import { tableColumnSortCommon } from '@/lib/utils'
import type {
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
  ColumnSizingState,
  VisibilityState,
  ColumnOrderState
} from '@tanstack/vue-table'
import { sort, type ISortByObjectSorter } from 'fast-sort'
import { logEvent } from 'histoire/client'
import {
  AlignJustifyIcon,
  ArrowUpNarrowWideIcon,
  FolderIcon,
  SignalHighIcon,
  SignalMediumIcon,
  SignalLowIcon
} from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import { z } from 'zod'
import tasks from './data/tasks.json'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string().nullable().optional(),
  label: z.string(),
  priority: z.string(),
  errorMessage: z.string().optional()
})
type Task = z.infer<typeof taskSchema>

const columns: ColumnDef<Task>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ table, column }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h(BuiCheckbox, {
          checked: table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : table.getIsAllPageRowsSelected(),
          'onUpdate:checked': (value: boolean) =>
            table.getIsSomePageRowsSelected()
              ? table.toggleAllPageRowsSelected(false)
              : table.toggleAllPageRowsSelected(value),
          ariaLabel: 'Select row'
        }),
        tableColumnSortCommon(column, 'ID')
      ])
    },
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h(BuiCheckbox, {
          checked: row.getIsSelected(),
          'onUpdate:checked': (value: boolean) => row.toggleSelected(value),
          ariaLabel: 'Select row'
        }),
        `${row.getValue('id')}`
      ]),
    enableHiding: false,
    meta: { title: 'ID', pinLeft: true }
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'status',
    header: ({ column }) => tableColumnSortCommon(column, 'Status'),
    meta: { title: 'Статус таска' }
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => tableColumnSortCommon(column, 'Priorities')
  },
  { id: 'hiddenColumn', header: 'Hidden Column', cell: 'secret info' }
]
const data = ref<Task[]>(tasks)

function onRowAction(row: Task, action: string) {
  const str = `${action}: ${row.id}`
  alert(str)
}
function onGroupAction(group: string | number, action: string) {
  const str = `${action}: ${group}`
  alert(str)
}

type TaskSortingState = { id: keyof Task; desc: boolean }
const sorting = ref<TaskSortingState[]>([{ id: 'id', desc: false }])
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10
})
const totalItems = tasks.length

const selection = ref<RowSelectionState>({})
function updateSelection(val: RowSelectionState) {
  logEvent('selection was changed', val)
  selection.value = val
}

const columnVisibility = ref<VisibilityState>({ hiddenColumn: false })
const columnSizing = ref<ColumnSizingState>({ title: 300 })
const columnOrder = ref<ColumnOrderState>()

type GroupBy = 'none' | 'status' | 'priority'
const groupBy = ref<GroupBy>('none')
const groupLabels = {
  status: ['Status', 'Not in any status'],
  priority: ['Priority', 'Not in any priorities']
}

const sortedData = computed(() => {
  const sortDirection = (sorting.value[0].desc ? 'desc' : 'asc') as 'asc'
  const sortColumn = sorting.value[0].id
  const groupByStr = groupBy.value

  const sortBy: ISortByObjectSorter<Task> | ISortByObjectSorter<Task>[] = [
    {
      [sortDirection]: sortColumn
    }
  ]

  // sort by grouping column first, but not when manually sorting by it
  if (groupByStr !== 'none' && sortColumn !== groupByStr) {
    sortBy.unshift({
      asc: groupByStr
    })
  }

  // sort by ID when possible
  if (sortColumn !== 'id') {
    sortBy.push({
      asc: 'id'
    })
  }

  return sort(data.value).by([...sortBy])
})

function renderSubComponent(row: Row<Task>) {
  if (row.original.errorMessage) {
    return () => h('span', { style: 'color: red' }, `Subrow: ${row.original.errorMessage}`)
  } else {
    return undefined
  }
}

function deleteRow() {
  data.value = data.value.map((a) => a)
}
function updateRows() {
  data.value.shift()
}

function groupName(group: string | number) {
  if (groupBy.value === 'priority') {
    if (group === 'high') {
      return () => h(SignalHighIcon, { class: 'size-4 inline-block' })
    }

    if (group === 'medium') {
      return () => h(SignalMediumIcon, { class: 'size-4 inline-block' })
    }

    if (group === 'low') {
      return () => h(SignalLowIcon, { class: 'size-4 inline-block' })
    }

    return () => group
  }

  return () => group
}
</script>

<template>
  <Story title="BuiDataTable" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant key="variant" title="Sorting, Pagination, Grouping, Subrow">
      <BuiDataTable
        :columns="columns"
        :data="sortedData"
        v-model:sorting="sorting"
        v-model:pagination="pagination"
        v-model:column-sizing="columnSizing"
        v-model:column-visibility="columnVisibility"
        v-model:column-order="columnOrder"
        @update:selection="updateSelection"
        :total-items="totalItems"
        class="caption-top"
        :manualPagination="false"
        :getRowId="(row) => row.id"
        :groupBy="groupBy === 'none' ? undefined : groupBy"
        :groupLabels="groupLabels"
        :renderSubComponent="renderSubComponent"
        enable-column-list-control
      >
        <template #caption="{ table }">
          <div class="flex justify-between">
            <BuiButton variant="outline">Download YAML</BuiButton>
            <BuiButton variant="outline" @click="updateRows"> Delete row </BuiButton>
            <BuiButton variant="outline" @click="deleteRow"> Update rows </BuiButton>

            <BuiTabs v-model="groupBy">
              <BuiTabsList class="grid w-full grid-cols-3" variant="default">
                <BuiTabsTrigger value="none" variant="default" class="px-2 py-[5px]">
                  <AlignJustifyIcon :size="14" />
                </BuiTabsTrigger>
                <BuiTabsTrigger value="status" variant="default" class="px-2 py-[5px]">
                  <FolderIcon :size="14" />
                </BuiTabsTrigger>
                <BuiTabsTrigger value="priority" variant="default" class="px-2 py-[5px]">
                  <ArrowUpNarrowWideIcon :size="14" />
                </BuiTabsTrigger>
              </BuiTabsList>
            </BuiTabs>

            <span>
              {{ table.getFilteredSelectedRowModel().rows?.length }} of
              {{ table.getFilteredRowModel().rows?.length }} row(s) selected
            </span>
          </div>
        </template>
        <template #nodata>No data</template>
        <template #groupByRow="{ group }"> Optional slot for: `{{ group }}` </template>
        <template #groupName="{ group }">
          <component :is="groupName(group)"></component>
        </template>
        <template #groupActions="{ group }">
          <RowActionsMenuContent
            :actions="['Group action']"
            @select="(action) => onGroupAction(group, action)"
          />
        </template>
        <template #rowActions="{ row }">
          <RowActionsMenuContent
            :actions="['action 1', 'action 2']"
            @select="(action) => onRowAction(row, action)"
          />
        </template>
      </BuiDataTable>
    </Variant>
  </Story>
</template>
