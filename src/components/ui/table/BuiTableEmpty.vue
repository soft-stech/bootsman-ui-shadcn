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
      :class="cn('whitespace-nowrap p-4 align-middle text-sm text-foreground/[0.32]', props.class)"
      :colspan="props.colspan"
    >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </BuiTableCell>
  </BuiTableRow>
</template>
