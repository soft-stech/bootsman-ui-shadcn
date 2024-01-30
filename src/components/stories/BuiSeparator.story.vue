<script setup lang="ts">
import BuiSeparator from '@/components/ui/separator/BuiSeparator.vue'

const variant = 'default'
</script>

<template>
  <Story title="BuiSeparator" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant`" :title="`Horizontal/Vertical`">
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <BuiSeparator class="my-4" />
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <BuiSeparator orientation="vertical" />
        <div>Docs</div>
        <BuiSeparator orientation="vertical" />
        <div>Source</div>
      </div>
    </Variant>
  </Story>
</template>
