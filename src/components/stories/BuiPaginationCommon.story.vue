<script setup lang="ts">
import { BuiPaginationCommon, type PageSize } from '@/index'

import { ref } from 'vue'

const pageIndex = ref(1)
const pageSize = ref(10)
</script>

<template>
  <Story title="BuiPaginationCommon" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant :key="`variant`" title="Pagination">
      <BuiPaginationCommon
        class="float-right"
        :total="100"
        v-model:pageIndex="pageIndex"
        v-model:pageSize="pageSize"
      >
      </BuiPaginationCommon>
    </Variant>
  </Story>
</template>
