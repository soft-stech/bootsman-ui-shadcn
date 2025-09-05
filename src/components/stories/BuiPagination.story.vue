<script setup lang="ts">
import {
  BuiPagination,
  BuiPaginationEllipsis,
  BuiPaginationFirst,
  BuiPaginationLast,
  BuiPaginationList,
  BuiPaginationListItem,
  BuiPaginationNext,
  BuiPaginationPrev
} from '@/components/ui/pagination'

import { BuiButton } from '@/components/ui/button'
</script>

<template>
  <Story title="BuiPagination" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant :key="`variant`" title="Pagination">
      <BuiPagination
        v-slot="{ page }"
        :total="100"
        :sibling-count="1"
        show-edges
        :default-page="2"
        :itemsPerPage="10"
        class="m-1"
      >
        <BuiPaginationList v-slot="{ items }" class="flex items-center gap-1">
          <BuiPaginationFirst />
          <BuiPaginationPrev />

          <template v-for="(item, index) in items">
            <BuiPaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <BuiButton
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline-solid'"
              >
                {{ item.value }}
              </BuiButton>
            </BuiPaginationListItem>
            <BuiPaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <BuiPaginationNext />
          <BuiPaginationLast />
        </BuiPaginationList>
      </BuiPagination>
    </Variant>
  </Story>
</template>
