import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { h } from 'vue'

import { BuiButton } from '@/components/ui/button'
import type { Column, Updater } from '@tanstack/vue-table'
import { ArrowDownUpIcon } from 'lucide-vue-next'
import { type Ref } from 'vue'

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tableColumnSortCommon = (column: Column<any>, name: string) => {
  return h(
    BuiButton,
    {
      variant: 'none',
      class: 'text-foreground px-0',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    },
    () => [name, h(ArrowDownUpIcon, { class: 'ml-2 h-4 w-4 text-muted-foreground' })]
  )
}
