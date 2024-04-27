<script setup lang="ts">
import { BuiDataTable } from '@/components/ui/table'
import { BuiButton, BuiCheckbox, BuiTabs, BuiTabsList, BuiTabsTrigger } from '@/index'
import { tableColumnSortCommon } from '@/lib/utils'
import type { ColumnDef, PaginationState, Row, RowSelectionState } from '@tanstack/vue-table'
import { sort, type ISortByObjectSorter } from 'fast-sort'
import { logEvent } from 'histoire/client'
import { AlignJustifyIcon, FolderIcon } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import { z } from 'zod'
import tasks from './data/tasks.json'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  errorMessage: z.string().optional()
})
type Task = z.infer<typeof taskSchema>
const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: ({ table, column }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h(BuiCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(value),
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
      ])
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'status',
    header: ({ column }) => tableColumnSortCommon(column, 'Status')
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => tableColumnSortCommon(column, 'Priorities')
  }
]
const data = ref<Task[]>(tasks)

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

type GroupBy = 'none' | 'status'
const groupBy = ref<GroupBy>('none')
const groupLabels = {
  status: 'Status'
}

const sortedData = computed(() => {
  const sortDirection = (sorting.value[0].desc ? 'desc' : 'asc') as 'asc'
  const sortColumn = sorting.value[0].id
  const groupByStr = groupBy.value

  const sortBy: ISortByObjectSorter<Task> | ISortByObjectSorter<Task>[] = [
    {
      [sortDirection]: groupByStr === 'none' ? sortColumn : [(row) => row[groupByStr], sortColumn]
    }
  ]

  return sort(data.value).by([...sortBy])
})

function renderSubComponent(row: Row<Task>) {
  if (row.original.errorMessage) {
    return () => h('span', { style: 'color: red' }, `Subrow: ${row.original.errorMessage}`)
  } else {
    return undefined
  }
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
        @update:selection="updateSelection"
        :total-items="totalItems"
        class="caption-top"
        :manualPagination="false"
        :getRowId="(row) => row.id"
        :groupBy="groupBy === 'none' ? undefined : groupBy"
        :groupLabels="groupLabels"
        :renderSubComponent="renderSubComponent"
      >
        <template #caption="{ table }">
          <div class="flex justify-between">
            <BuiButton variant="outline">Download YAML</BuiButton>

            <BuiTabs v-model="groupBy">
              <BuiTabsList class="grid w-full grid-cols-2" :variant="'default'">
                <BuiTabsTrigger value="none" :variant="'default'"
                  ><AlignJustifyIcon
                /></BuiTabsTrigger>
                <BuiTabsTrigger value="status" :variant="'default'">
                  <FolderIcon />
                </BuiTabsTrigger>
              </BuiTabsList>
            </BuiTabs>

            <span>
              {{ table.getFilteredSelectedRowModel().rows?.length }} of
              {{ table.getFilteredRowModel().rows?.length }} row(s) selected
            </span>
          </div>
        </template>
      </BuiDataTable>
    </Variant>
  </Story>
</template>
