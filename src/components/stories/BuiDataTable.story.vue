<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { BuiDataTable } from '@/components/ui/table'
import { ref } from 'vue'
import { z } from 'zod'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string()
})

type Task = z.infer<typeof taskSchema>

//@ts-ignore json
import tasks from './data/tasks.json'

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'priority',
    header: 'Priority'
  }
]

const data = ref<Task[]>(tasks)
</script>

<template>
  <Story title="BuiDataTable" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant :key="`variant`" title="Common">
      <BuiDataTable :columns="columns" :data="data" />
    </Variant>
  </Story>
</template>
