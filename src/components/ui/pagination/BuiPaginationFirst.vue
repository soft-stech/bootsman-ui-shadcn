<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps, useForwardProps } from 'radix-vue'
import { ChevronsLeft } from 'lucide-vue-next'
import { BuiButton } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationFirst v-bind="forwarded">
    <BuiButton class="h-10 w-10 p-0" variant="outline">
      <slot>
        <ChevronsLeft class="h-4 w-4" />
      </slot>
    </BuiButton>
  </PaginationFirst>
</template>
