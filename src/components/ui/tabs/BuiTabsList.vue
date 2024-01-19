<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { tabsListVariants } from '.'

interface Props extends TabsListProps {
  variant?: NonNullable<Parameters<typeof tabsListVariants>[0]>['variant']
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <TabsList v-bind="props" :class="cn(tabsListVariants({ variant }), props.class ?? '')">
    <slot />
  </TabsList>
</template>
