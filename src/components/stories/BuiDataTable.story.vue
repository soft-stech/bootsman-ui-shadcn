<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { BuiDataTable } from '@/components/ui/table'
import { ref } from 'vue'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  }
]

const data = ref<Payment[]>([
  {
    id: '1',
    amount: 100,
    status: 'pending',
    email: 'm1@example.com'
  },
  {
    id: '2',
    amount: 200,
    status: 'pending',
    email: 'm2@example.com'
  },
  {
    id: '3',
    amount: 300,
    status: 'processing',
    email: 'm2@example.com'
  },
  {
    id: '4',
    amount: 150,
    status: 'success',
    email: 'm3@example.com'
  }
])
</script>

<template>
  <Story title="BuiDataTable" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant :key="`variant`" title="Common">
      <BuiDataTable :columns="columns" :data="data" />
    </Variant>
  </Story>
</template>
