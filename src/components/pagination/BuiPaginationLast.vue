<script setup lang="ts">
import { PaginationLast, type PaginationLastProps, useForwardProps } from 'reka-ui'
import { ChevronLast } from 'lucide-vue-next'
import { BuiButton } from '@/components/button'

const props = withDefaults(defineProps<PaginationLastProps>(), {
  asChild: true
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationLast v-bind="forwarded">
    <BuiButton class="h-8 w-8 p-0" variant="outline">
      <slot>
        <ChevronLast class="h-4 w-4" />
      </slot>
    </BuiButton>
  </PaginationLast>
</template>
