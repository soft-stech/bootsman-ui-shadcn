import { type Component } from 'vue'

export { default as BuiActionBar } from './BuiActionBar.vue'
export interface ActionBarItem {
  label: string
  icon?: Component
  variant?: 'default' | 'destructive'
  disabled?: boolean
  affectsCount?: number
  handler: () => void
}
