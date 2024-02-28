<script setup lang="ts">
import BuiSeparator from '@/components/ui/separator/BuiSeparator.vue'
import BuiScrollArea from '@/components/ui/scroll-area/BuiScrollArea.vue'

const variant = 'default'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
</script>

<template>
  <Story title="BuiScrollArea" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant`" :title="`${variant}`">
      <div class="flex items-center p-1">
        <BuiScrollArea class="h-72 w-48 rounded-md border">
          <div class="p-4">
            <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>

            <div v-for="tag in tags" :key="tag">
              <div class="text-sm">
                {{ tag }}
              </div>
              <BuiSeparator class="my-2" />
            </div>
          </div>
        </BuiScrollArea>
      </div>
    </Variant>
  </Story>
</template>
