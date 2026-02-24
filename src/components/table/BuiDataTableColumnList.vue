<script setup lang="ts" generic="TData, _TValue">
import { BuiCheckbox } from '@/components/checkbox'
import { BuiCommandItem } from '@/components/command'
import type { Column } from '@tanstack/vue-table'
import { useSortable } from '@vueuse/integrations/useSortable'
import { useTemplateRef } from 'vue'

const columnsListRef = useTemplateRef<HTMLElement>('columnsListRef')
const columnsList = defineModel<Column<TData, unknown>[]>('columnsList', {
  default: [],
  required: true
})
useSortable(columnsListRef, columnsList, { handle: '.dragHandler' })

const getColumnLabel = (col: Column<TData, unknown>) => {
  return (
    (col.columnDef.meta as { title: string })?.title ||
    col.id.replace(/^values\./, '').replace(/([A-Z])/g, ' $1')
  )
}
</script>

<template>
  <div ref="columnsListRef">
    <BuiCommandItem
      v-for="col in columnsList"
      :key="`column-${col.id}`"
      :value="getColumnLabel(col)"
      class="text-muted-foreground flex gap-4 px-2 py-1.5 text-xs font-medium capitalize"
      @select="col.toggleVisibility()"
    >
      <BuiCheckbox :model-value="col.getIsVisible()" />
      <div class="dragHandler grow">
        {{ getColumnLabel(col) }}
      </div>
    </BuiCommandItem>
  </div>
</template>
