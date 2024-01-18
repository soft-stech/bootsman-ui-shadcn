<script setup lang="ts">
import { PaginationPrev, type PaginationPrevProps, useForwardProps } from 'radix-vue'
import { ChevronLeft } from 'lucide-vue-next'
import { BuiButton } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  asChild: true
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationPrev v-bind="forwarded">
    <BuiButton class="h-10 w-10 p-0" variant="outline">
      <slot>
        <ChevronLeft class="h-4 w-4" />
      </slot>
    </BuiButton>
  </PaginationPrev>
</template>
