import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { h, type FunctionalComponent } from 'vue'

import { BuiButton } from '@/components/ui/button'
import type { Column, Updater } from '@tanstack/vue-table'
import { ArrowDownIcon, ArrowDownUpIcon, ArrowUpIcon } from 'lucide-vue-next'
import { type Ref } from 'vue'

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tableColumnSortCommon = (column: Column<any>, name: string) => {
  let icon: FunctionalComponent

  if (column.getIsSorted() === 'asc') {
    icon = ArrowDownIcon
  } else if (column.getIsSorted() === 'desc') {
    icon = ArrowUpIcon
  } else {
    icon = ArrowDownUpIcon
  }

  return h(
    BuiButton,
    {
      variant: 'none',
      class: 'text-foreground px-0 text-sm font-semibold',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    },
    () => [
      h('div', { class: 'whitespace-normal break-normal' }, [name]),
      h(icon, { class: 'ml-2 h-4 w-4 text-muted-foreground' })
    ]
  )
}
