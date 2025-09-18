<script setup lang="ts">
import { BuiScrollArea } from '@/components/scroll-area'
import { BuiSeparator } from '@/components/separator'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
</script>

<template>
  <BuiScrollArea class="h-72 w-48 rounded-md border">
    <div class="p-4">
      <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>

      <div v-for="tag in tags" :key="tag">
        <div class="text-sm">
          {{ tag }}
        </div>
        <BuiSeparator class="my-2" />
      </div>
    </div>
  </BuiScrollArea>
</template>
