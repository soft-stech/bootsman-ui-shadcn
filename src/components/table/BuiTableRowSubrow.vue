<script setup lang="ts" generic="TData, TValue">
import { BuiTableCell, BuiTableRow } from '@/components/table'
import { FlexRender, type ColumnDef, type Row } from '@tanstack/vue-table'
import { getPinningStyle } from './'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  row: Row<TData>
  renderSubComponent?: (row: Row<TData>) => (() => unknown) | undefined
  columns: ColumnDef<TData, TValue>[]
}>()

// иногда мы используем фейковые строки с пустыми значениями, лучше их скрыть
const FAKE_ROW = '[!fake-empty!]'
const isEmptyRow = computed(() => {
  // @ts-expect-error name с таким значением это наше внутреннее соглашение. См. Боцман Дашборд, таблицу Projects/Namespaces
  return props.row.original.name?.includes(FAKE_ROW)
})

const isHovered = ref<boolean>(false)
</script>

<template>
  <BuiTableRow
    v-if="!isEmptyRow"
    :data-row-state="row.getIsSelected() ? 'selected' : undefined"
    :class="
      cn(props.renderSubComponent?.(row) ? 'border-b-0' : '', isHovered ? 'bg-accent/4!' : '')
    "
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
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
    :class="cn(isHovered ? 'bg-accent/4!' : '')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <BuiTableCell :colspan="columns.length" class="pt-0">
      <component :is="props.renderSubComponent?.(row)?.()"></component>
    </BuiTableCell>
    <template #actions>
      <slot name="actions" />
    </template>
  </BuiTableRow>
</template>
