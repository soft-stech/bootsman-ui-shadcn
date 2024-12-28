<script setup lang="ts">
import { PaginationNext, type PaginationNextProps, useForwardProps } from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import { BuiButton } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationNextProps>(), {
  asChild: true
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationNext v-bind="forwarded">
    <BuiButton class="h-8 w-8 p-0" variant="outline">
      <slot>
        <ChevronRight class="h-4 w-4" />
      </slot>
    </BuiButton>
  </PaginationNext>
</template>
