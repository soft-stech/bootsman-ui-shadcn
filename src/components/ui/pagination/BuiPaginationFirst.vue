<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps, useForwardProps } from 'reka-ui'
import { ChevronFirst } from 'lucide-vue-next'
import { BuiButton } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationFirst v-bind="forwarded">
    <BuiButton class="h-8 w-8 p-0" variant="outline">
      <slot>
        <ChevronFirst class="h-4 w-4" />
      </slot>
    </BuiButton>
  </PaginationFirst>
</template>
