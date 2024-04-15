<script setup lang="ts">
import { BuiToggleGroup, BuiToggleGroupItem } from '@/index'
import { Bold, Italic, Underline } from 'lucide-vue-next'
</script>

<template>
  <Story title="BuiToggleGroup" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant title="Single">
      <BuiToggleGroup type="single">
        <BuiToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </BuiToggleGroupItem>
        <BuiToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic class="h-4 w-4" />
        </BuiToggleGroupItem>
        <BuiToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline class="h-4 w-4" />
        </BuiToggleGroupItem>
      </BuiToggleGroup>
    </Variant>

    <Variant title="Multiple">
      <BuiToggleGroup type="multiple">
        <BuiToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </BuiToggleGroupItem>
        <BuiToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic class="h-4 w-4" />
        </BuiToggleGroupItem>
        <BuiToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline class="h-4 w-4" />
        </BuiToggleGroupItem>
      </BuiToggleGroup>
    </Variant>
  </Story>
</template>
