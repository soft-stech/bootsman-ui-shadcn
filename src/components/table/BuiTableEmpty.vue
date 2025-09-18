<script setup lang="ts">
import BuiTableRow from './BuiTableRow.vue'
import BuiTableCell from './BuiTableCell.vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  colspan?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  colspan: 1
})
</script>

<template>
  <BuiTableRow>
    <BuiTableCell
      :class="cn('text-foreground/32 p-4 whitespace-nowrap', props.class)"
      :colspan="props.colspan"
    >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </BuiTableCell>
  </BuiTableRow>
</template>
