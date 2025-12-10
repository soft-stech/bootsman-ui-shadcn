<script setup lang="ts">
import { BuiDataTable } from '@/components/table'
import RowActionsMenuContent from './ActionsMenuContent.vue'
import type {
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
  VisibilityState,
  ColumnOrderState
} from '@tanstack/vue-table'
import { sort, type ISortByObjectSorter } from 'fast-sort'
import {
  AlignJustifyIcon,
  ArrowUpNarrowWideIcon,
  FolderIcon,
  SignalHighIcon,
  SignalMediumIcon,
  SignalLowIcon
} from 'lucide-vue-next'
import { computed, h, ref, withModifiers } from 'vue'
import { z } from 'zod'
import tasks from '@/stories/data/tasks.json'
import { BuiCheckbox } from '@/components/checkbox'
import { tableColumnSortCommon } from '@/lib/utils'
import { BuiButton } from '@/components/button'
import { BuiTabs, BuiTabsList, BuiTabsTrigger } from '@/components/tabs'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string().nullable().optional(),
  label: z.string(),
  priority: z.string(),
  errorMessage: z.string().optional(),
  age: z.string().optional()
})
type Task = z.infer<typeof taskSchema>

const columns: ColumnDef<Task>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ table, column }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h(BuiCheckbox, {
          modelValue: table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : table.getIsAllPageRowsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
            table.getIsSomePageRowsSelected()
              ? table.toggleAllPageRowsSelected(false)
              : table.toggleAllPageRowsSelected(!!value),
          ariaLabel: 'Select row',
          onClick: withModifiers(() => {}, ['stop'])
        }),
        tableColumnSortCommon(column, 'ID')
      ])
    },
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h(BuiCheckbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
          ariaLabel: 'Select row'
        }),
        `${row.getValue('id')}`
      ]),
    enableHiding: false,
    meta: { title: 'ID', pinLeft: true }
  },
  {
    accessorKey: 'title',
    header: 'Title',
    enableSorting: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => tableColumnSortCommon(column, 'Очень длинный заголовок для статуса'),
    meta: { title: 'Статус таска' }
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => tableColumnSortCommon(column, 'Priorities')
  },
  {
    accessorKey: 'age',
    header: ({ column }) => tableColumnSortCommon(column, 'Age')
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

const selection = ref<RowSelectionState | undefined>({})
function updateSelection(val?: RowSelectionState) {
  console.log('selection was changed', val)
  selection.value = val
}

const columnVisibility = ref<VisibilityState>({ hiddenColumn: false })
const columnSizing = ref<Record<string, number>>({ title: 450 })
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
      <div class="page-wrapper">
        <div class="table-wrapper">
          <BuiDataTable
            :columns="columns"
            :data="sortedData"
            v-model:sorting="sorting"
            v-model:pagination="pagination"
            v-model:column-visibility="columnVisibility"
            v-model:column-sizing="columnSizing"
            v-model:column-order="columnOrder"
            @update:selection="updateSelection"
            :total-items="totalItems"
            class="caption-top"
            :manualPagination="false"
            :getRowId="(row) => row.id"
            :groupBy="groupBy === 'none' ? undefined : groupBy"
            :groupLabels="groupLabels"
            :renderSubComponent="renderSubComponent"
            :freeze-header="true"
            enable-column-list-control
            :enable-group-folding="true"
            :pagination-translations="{
              itemsPerPage: 'Tasks per page',
              page: 'Page',
              of: 'of'
            }"
          >
            <template #caption="{ table }">
              <div class="flex h-fit items-center justify-between">
                <div class="flex h-full flex-row items-center gap-3">
                  <BuiButton variant="outline">Download YAML</BuiButton>
                  <BuiButton variant="outline" @click="updateRows"> Delete row </BuiButton>
                  <BuiButton variant="outline" @click="deleteRow"> Update rows </BuiButton>
                </div>

                <div class="flex h-full flex-row items-center gap-3">
                  <BuiTabs v-model="groupBy">
                    <BuiTabsList class="grid w-full grid-cols-3" variant="default">
                      <BuiTabsTrigger value="none" variant="default">
                        <AlignJustifyIcon :size="14" />
                      </BuiTabsTrigger>
                      <BuiTabsTrigger value="status" variant="default">
                        <FolderIcon :size="14" />
                      </BuiTabsTrigger>
                      <BuiTabsTrigger value="priority" variant="default">
                        <ArrowUpNarrowWideIcon :size="14" />
                      </BuiTabsTrigger>
                    </BuiTabsList>
                  </BuiTabs>

                  <span>
                    {{ table.getFilteredSelectedRowModel().rows?.length }} of
                    {{ table.getFilteredRowModel().rows?.length }} row(s) selected
                  </span>
                </div>
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
            <template #numberOfItems>{{ data.length }} tasks</template>
          </BuiDataTable>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.page-wrapper {
  height: 95vh;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  overflow: hidden auto;
}

.table-wrapper {
  height: 100%;
  flex-direction: column;
  display: flex;
}
</style>
