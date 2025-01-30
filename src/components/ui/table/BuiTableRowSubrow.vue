<script setup lang="ts" generic="TData, TValue">
import { BuiTableCell, BuiTableRow } from '@/components/ui/table'
import { FlexRender, type ColumnDef, type Row } from '@tanstack/vue-table'
import { getPinningStyle } from './'
import { computed } from 'vue'

const props = defineProps<{
  row: Row<TData>
  renderSubComponent?: (row: Row<TData>) => (() => any) | undefined
  columns: ColumnDef<TData, TValue>[]
}>()

// иногда мы используем фейковые строки с пустыми значениями, лучше их скрыть
const isEmptyRow = computed(() => {
  return props.row.getVisibleCells().every((cell) => !cell.getContext().getValue())
})
</script>

<template>
  <BuiTableRow
    v-if="!isEmptyRow"
    :data-row-state="row.getIsSelected() ? 'selected' : undefined"
    :class="props.renderSubComponent?.(row) ? 'border-b-0' : ''"
  >
    <BuiTableCell
      v-for="cell in row.getVisibleCells()"
      :key="cell.id"
      :style="{ ...getPinningStyle(cell.column) }"
    >
      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
    </BuiTableCell>
    <template #actions>
      <slot name="actions" />
    </template>
  </BuiTableRow>

  <BuiTableRow
    v-if="props.renderSubComponent?.(row)"
    :data-row-state="row.getIsSelected() ? 'selected' : undefined"
  >
    <BuiTableCell :colspan="columns.length" class="pt-0">
      <component :is="props.renderSubComponent?.(row)?.()"></component>
    </BuiTableCell>
    <template #actions>
      <slot name="actions" />
    </template>
  </BuiTableRow>
</template>
