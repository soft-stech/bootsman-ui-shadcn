import type { Column } from '@tanstack/vue-table'
import type { CSSProperties } from 'vue'

export { default as BuiTable } from './BuiTable.vue'
export { default as BuiTableBody } from './BuiTableBody.vue'
export { default as BuiTableCell } from './BuiTableCell.vue'
export { default as BuiTableHead } from './BuiTableHead.vue'
export { default as BuiTableHeader } from './BuiTableHeader.vue'
export { default as BuiTableRow } from './BuiTableRow.vue'
export { default as BuiTableRowSubrow } from './BuiTableRowSubrow.vue'
export { default as BuiTableCaption } from './BuiTableCaption.vue'
export { default as BuiTableEmpty } from './BuiTableEmpty.vue'
export { default as BuiTableFooter } from './BuiTableFooter.vue'
export { default as BuiDataTable } from './BuiDataTable.vue'

export function getPinningStyle<TData>(column: Column<TData, unknown>): CSSProperties {
  const isPinned = column.getIsPinned()
  return {
    left: isPinned === 'left' ? '0' : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? '1' : '0'
  }
}
