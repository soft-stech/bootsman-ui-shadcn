<script setup lang="ts">
import { BuiPaginationCommon, type PageSize } from '@/index'

import { ref } from 'vue'

const pageIndex = ref(0)
const pageSize = ref(10)
</script>

<template>
  <Story title="BuiPaginationCommon" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant :key="`variant`" title="Pagination">
      <BuiPaginationCommon
        :total="100"
        :pageIndex="pageIndex"
        :pageSize="pageSize as PageSize"
        :setPageIndex="(v) => (pageIndex = v)"
        :setPageSize="
          (v) => {
            pageSize = v
            pageIndex = 0
          }
        "
      >
      </BuiPaginationCommon>
    </Variant>
  </Story>
</template>
