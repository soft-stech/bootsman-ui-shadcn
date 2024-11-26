<script setup lang="ts">
import { BuiContextMenuContent, BuiContextMenuItem } from '@/components/ui/context-menu'

defineProps<{
  actions?: string[]
}>()

const emit = defineEmits<{
  select: [action: string]
}>()
</script>

<template>
  <BuiContextMenuContent v-if="actions && actions.length > 0">
    <BuiContextMenuItem
      v-for="(action, idx) in actions"
      @click="() => emit('select', action)"
      :key="idx"
    >
      {{ action }}
    </BuiContextMenuItem>
  </BuiContextMenuContent>
</template>
