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

const props = defineProps<{
  total: number
  translations?: {
    itemsPerPage: string
    page: string
    of: string
  }
}>()

const pageSize = defineModel<PageSize>('pageSize', { default: 10, required: true })
const pageIndex = defineModel<number>('pageIndex', { default: 1, required: true })
const totalPages = computed(() => Math.ceil(props.total / pageSize.value))

const pageSizeString = computed({
  get() {
    return String(pageSize.value)
  },
  set(value: string) {
    pageSize.value = parseInt(value) as PageSize
  }
})
</script>

<template>
  <BuiPagination
    v-slot="{ page }"
    :total="props.total"
    :itemsPerPage="pageSize"
    v-model:page="pageIndex"
  >
    <BuiPaginationList class="relative flex items-center justify-center gap-2">
      <p class="text-sm text-muted-foreground">
        {{ translations?.itemsPerPage || 'Items per page' }}
      </p>
      <BuiSelect v-model.number="pageSizeString">
        <BuiSelectTrigger class="mr-2 w-[70px]">
          <BuiSelectValue :placeholder="pageSize.toString()" />
        </BuiSelectTrigger>
        <BuiSelectContent side="top">
          <BuiSelectItem v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize.toString()">
            {{ pageSize }}
          </BuiSelectItem>
        </BuiSelectContent>
      </BuiSelect>
      <template v-if="totalPages > 1">
        <p class="text-sm text-muted-foreground">
          {{ translations?.page || 'Page' }} {{ page }} {{ translations?.of || 'of' }}
          {{ totalPages }}
        </p>
        <BuiPaginationFirst />
        <BuiPaginationPrev />
        <BuiInput v-model="pageIndex" class="w-28" placeholder="Page number" />
        <BuiPaginationNext />
        <BuiPaginationLast />
      </template>
    </BuiPaginationList>
  </BuiPagination>
</template>
