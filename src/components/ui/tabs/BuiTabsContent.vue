<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsContentProps & { class?: string }>()
</script>

<template>
  <TabsContent
    :class="
      cn(
        'mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class
      )
    "
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>
