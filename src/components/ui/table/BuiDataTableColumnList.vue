<script setup lang="ts" generic="TData, TValue">
import type { Column } from '@tanstack/vue-table'
import { useTemplateRef } from 'vue'

import { BuiCommandItem } from '@/components/ui/command'
import { BuiCheckbox } from '@/components/ui/checkbox'
import { useSortable } from '@vueuse/integrations/useSortable'

const columnsListRef = useTemplateRef<HTMLElement>('columnsListRef')
const columnsList = defineModel<Column<TData, unknown>[]>('columnsList', {
  default: [],
  required: true
})
useSortable(columnsListRef, columnsList, { handle: '.dragHandler' })
</script>

<template>
  <div ref="columnsListRef">
    <BuiCommandItem
      v-for="col in columnsList"
      :key="`column-${col.id}`"
      :value="col.id"
      class="flex gap-4 px-2 py-1.5 text-xs font-medium capitalize text-muted-foreground"
      @select="col.toggleVisibility()"
    >
      <BuiCheckbox :checked="col.getIsVisible()" />
      <div class="dragHandler grow">
        {{
          col.columnDef.meta?.title || col.id.replace(/^values\./, '').replace(/([A-Z])/g, ' $1')
        }}
      </div>
    </BuiCommandItem>
  </div>
</template>
