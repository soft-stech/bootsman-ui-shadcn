<script setup lang="ts">
import { BuiDataTable } from '@/components/ui/table'
import type {
  ColumnDef,
  PaginationState,
  RowSelectionState,
  SortingState
} from '@tanstack/vue-table'
import { h, ref } from 'vue'
import { z } from 'zod'
import { BuiButton, BuiCheckbox } from '@/index'
import { tableColumnSortCommon } from '@/lib/utils'
import { logEvent } from 'histoire/client'
import tasks from './data/tasks.json'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string()
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

const sorting = ref<SortingState>([{ id: 'status', desc: false }])
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
</script>

<template>
  <Story title="BuiDataTable" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant key="variant" title="Sorting, Pagination">
      <BuiDataTable
        :columns="columns"
        :data="data"
        v-model:sorting="sorting"
        v-model:pagination="pagination"
        @update:selection="updateSelection"
        :total-items="totalItems"
        class="caption-top"
      >
        <template #caption="{ table }">
          <div class="flex justify-between">
            <BuiButton variant="outline">Download YAML</BuiButton>
            <span
              >{{ table.getFilteredSelectedRowModel().rows?.length }} of
              {{ table.getFilteredRowModel().rows?.length }} row(s) selected</span
            >
          </div>
        </template>
      </BuiDataTable>
    </Variant>
  </Story>
</template>
