<script setup lang="ts">
import {
  BuiPagination,
  BuiPaginationFirst,
  BuiPaginationLast,
  BuiPaginationList,
  BuiPaginationNext,
  BuiPaginationPrev
} from '@/components/ui/pagination'
import {
  BuiInput,
  BuiSelect,
  BuiSelectContent,
  BuiSelectItem,
  BuiSelectTrigger,
  BuiSelectValue
} from '@/index'
import { computed } from 'vue'

const pageSizes = [10, 20, 30, 40, 50] as const
export type PageSize = (typeof pageSizes)[number]

const props = withDefaults(
  defineProps<{
    pageSize?: PageSize
    total: number
    pageIndex: number
    setPageIndex: (i: number) => void
    setPageSize?: (i: number) => void
  }>(),
  { pageSize: 10 }
)

const pageCount = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const innerPageNumber = computed({
  get() {
    return props.pageIndex + 1
  },
  set(newValue) {
    if (newValue > 0 && newValue <= pageCount.value) props.setPageIndex(newValue - 1)
  }
})
</script>

<template>
  <div class="m-2">
    <BuiPagination :total="props.total" :itemsPerPage="props.pageSize" :page="props.pageIndex + 1">
      <BuiPaginationList class="flex items-center justify-center gap-2">
        <template v-if="props.setPageSize">
          <p class="text-sm text-muted-foreground">Items per page</p>
          <BuiSelect
            @update:modelValue="(v) => props.setPageSize && props.setPageSize(parseInt(v))"
          >
            <BuiSelectTrigger class="mr-2 w-[70px]">
              <BuiSelectValue :placeholder="props.pageSize.toString()" />
            </BuiSelectTrigger>
            <BuiSelectContent side="top">
              <BuiSelectItem v-for="pageSize in pageSizes" :key="pageSize" :value="`${pageSize}`">
                {{ pageSize }}
              </BuiSelectItem>
            </BuiSelectContent>
          </BuiSelect>
        </template>

        <p class="text-sm text-muted-foreground">
          Page {{ props.pageIndex + 1 }} of {{ pageCount }}
        </p>

        <BuiPaginationFirst @click="props.setPageIndex(0)" />
        <BuiPaginationPrev @click="props.setPageIndex(props.pageIndex - 1)" />

        <BuiInput v-model="innerPageNumber" class="w-28" placeholder="Page number" />

        <BuiPaginationNext @click="props.setPageIndex(props.pageIndex + 1)" />
        <BuiPaginationLast @click="props.setPageIndex(pageCount - 1)" />
      </BuiPaginationList>
    </BuiPagination>
  </div>
</template>
