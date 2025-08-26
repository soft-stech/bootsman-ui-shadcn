<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { tabsTriggerVariants } from '.'

interface Props extends TabsTriggerProps {
  variant?: NonNullable<Parameters<typeof tabsTriggerVariants>[0]>['variant']
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <TabsTrigger v-bind="props" :class="cn(tabsTriggerVariants({ variant }), props.class ?? '')">
    <div class="flex items-center text-left">
      <slot />
    </div>
  </TabsTrigger>
</template>
